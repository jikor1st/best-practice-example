import { useState, useRef, ChangeEvent, FormEvent } from 'react';

type ChangeEventType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type InitialValueProps<FV> = { [P in keyof FV]: string };

export type InitialValidationProps<FV> = Partial<
  Record<keyof FV, FormValidate<FV>>
>;
interface InitialOptionsProps<FV> {
  validation?: InitialValidationProps<FV>;
}

interface HandleSubmitProps<FV, PR> {
  event: FormEvent<HTMLFormElement>;
  mutate: (formValue: InitialValueProps<FV>) => Promise<PR>;
  onError(error: unknown | Error): void;
  onSubmit?(resultData: PR): void;
}

interface ValidateFunctionOptions<FV> {
  deps: { [P in keyof FV]: string };
}
type ValidateFunction<FV> = (
  value: string,
  options: ValidateFunctionOptions<FV>,
) => boolean;

type FormValidate<FV> = {
  [key: string]: {
    validate: ValidateFunction<FV> | boolean;
    helperText: string;
    deps?: Array<keyof FV>;
  };
};
interface FormRegisterOptions<FV> {
  changeValue?: boolean;
  onChange?: ({
    name,
    value,
    event,
  }: {
    name: keyof FV;
    value: string;
    event: ChangeEventType;
  }) => void;
}
interface FormRegisterReturn<FV> {
  name: keyof FV;
  onChange: (event: ChangeEventType) => void;
}

type FormRegister<FV> = (
  name: keyof FV,
  options?: FormRegisterOptions<FV>,
) => FormRegisterReturn<FV>;

type FormState = {
  type: string | null;
  error: boolean;
  helperText: string;
};

// **formState 초기 설정
const createInitialFormState = <FV>(initialValue: InitialValueProps<FV>) => {
  const resultInitialFormState: {
    [key: string]: FormState;
  } = {};
  Object.keys(initialValue).forEach(key => {
    resultInitialFormState[key] = {
      type: null,
      error: false,
      helperText: '',
    };
  });
  return resultInitialFormState as { [K in keyof FV]: FormState };
};

// **useForm hook
export const useForm = <FV>(
  initialValue: InitialValueProps<FV>,
  initialOptions?: InitialOptionsProps<FV>,
) => {
  const { validation } = initialOptions ?? {};
  // **form 상태
  const [formValue, setFormValue] =
    useState<InitialValueProps<FV>>(initialValue);
  const [formState, setFormState] = useState(
    createInitialFormState<FV>(initialValue),
  );

  const [firstChangeValue, setFirstChangeValue] = useState(false);

  const [formSubmitting, setFormSubmitting] = useState(false);

  const formRefs = useRef();

  const formHasError = Object.values(
    formState as Record<string, FormState>,
  ).some(formState => {
    return formState.error;
  });

  // **handler
  const changeFormValue = (name: keyof FV, value: string) => {
    setFormValue(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetFormValue = (name: keyof FV) => {
    setFormValue(prev => ({
      ...prev,
      [name]: initialValue[name],
    }));
  };
  const changeFormState = (
    name: keyof FV,
    {
      type = '',
      error,
      helperText = '',
    }: Partial<FormState> & { error: boolean },
  ) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        type: type,
        error: error,
        helperText: helperText,
      },
    }));
  };
  const resetFormState = (name: keyof FV) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        type: null,
        error: false,
        helperText: '',
      },
    }));
  };
  const handleSubmit = async <PR = unknown>({
    event,
    mutate,
    onSubmit,
    onError,
  }: HandleSubmitProps<FV, PR>) => {
    event.preventDefault();

    let errorArray: boolean[] = [];

    // **폼 제출 전 유효성 검사
    if (validation) {
      Object.entries(validation).forEach(([name, validation]) => {
        const formName = name as keyof FV;
        const formValidation = validation as FormValidate<FV>;

        const { error } = checkValidation(
          formName,
          formValue[formName],
          formValidation,
        );

        errorArray.push(error);
      });
    }

    // **에러 있는지 확인
    const hasError = errorArray.some(error => error);

    // **유효성 form 제출 실행
    if (!hasError) {
      try {
        setFormSubmitting(true);

        const resultData = await mutate(formValue);
        // **submit 했을때
        if (typeof onSubmit === 'function') onSubmit(resultData);
      } catch (error) {
        // **submit 과정 오류 발생
        if (typeof onError === 'function') onError(error);
        throw error;
      } finally {
        setFormSubmitting(false);
      }
    }
  };

  const checkValidation = (
    name: keyof FV,
    value: string,
    validation?: FormValidate<FV>,
  ) => {
    let resultType = null;
    let resultError = false;
    let resultHelperText = '';

    if (validation) {
      for (const [type, { validate, helperText, deps }] of Object.entries(
        validation,
      )) {
        resultType = type;
        resultHelperText = helperText;

        // **validate error
        if (typeof validate === 'function') {
          const resultDeps: { [key: string]: string } = {};

          deps?.forEach(formName => {
            resultDeps[formName as string] = formValue[formName];
          });

          resultError = !validate(value, {
            deps: resultDeps as { [P in keyof FV]: string },
          });
        } else {
          resultError = !validate;
        }

        if (resultError) {
          changeFormState(name, {
            type,
            error: resultError,
            helperText,
          });
          break;
        } else {
          resultType = null;
          resultHelperText = '';
        }
      }
    }

    const resultValidation = {
      type: resultType,
      error: resultError,
      helperText: resultHelperText,
    };
    // **에러 초기화 및 통과
    changeFormState(name, resultValidation);

    return resultValidation;
  };

  // **input 등록
  const formRegister: FormRegister<FV> = (name, options) => {
    const { changeValue = true, onChange } = options ?? {};
    return {
      name: name,
      value: formValue[name],
      onChange: async event => {
        setFirstChangeValue(true);

        const name = event.target.name as keyof FV;
        const value = event.target.value;

        if (validation) {
          // **값 변경 시 유효성 검사
          const isValid = checkValidation(name, value, validation[name]);
        }

        // **form value name에 맞춰 setState
        if (changeValue) {
          changeFormValue(name, value);
        }

        if (typeof onChange === 'function') {
          onChange({ name, value, event });
        }
      },
    };
  };

  return {
    formValue,
    formState,
    formSubmitting,
    formHasError,
    firstChangeValue,
    formRegister,
    changeFormValue,
    changeFormState,
    resetFormValue,
    resetFormState,
    handleSubmit,
    checkValidation,
  };
};
