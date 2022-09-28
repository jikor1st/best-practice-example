import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';

type InitialValueProps<FV> = { [P in keyof FV]: FV[P] };
// interface UseFormOptionsProps {
//   onWatchChangeForm?: (name: string, value: string, event: ChangeEvent) => void;
// }

interface RegisterOptions {
  onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}
interface RegisterReturn<FV> {
  name: keyof FV;
  onChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}
type Register<FV> = (
  name: keyof FV,
  options?: RegisterOptions,
) => RegisterReturn<FV>;

export const useForm = <FV>(
  initialValue: InitialValueProps<FV>,
  // options?: UseFormOptionsProps,
) => {
  // **form 상태
  const [values, setValues] = useState<InitialValueProps<FV>>(initialValue);
  const [errors, setErros] = useState();

  // **callback
  const handleChange = (name: keyof FV, value: FV) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // **input 등록
  const register: Register<FV> = (name, options) => {
    const { onChange } = options ?? {};
    return {
      name: name,
      onChange: event => {
        const name = event.target.name;
        const value = event.target.value;
        if (typeof onChange === 'function') onChange(event);
        handleChange(name, value);
      },
    };
  };

  return {
    values,
    handleChange,
    register,
  };
};
