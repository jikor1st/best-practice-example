import { useState } from 'react';
import { useForm } from '@/hooks/service';
import styled from '@emotion/styled';
import { validate } from '@/utils';

interface IniialValuesType {
  email: string;
  password: string;
  passwordCheck: string;
}

const TestLoginPage = () => {
  const [isLoadingDuplicateCheckEmail, setIsLoadingDuplicateCheckEmail] =
    useState(false);
  const [duplicateCheckEmail, setDuplicateCheckEmail] = useState(false);

  const {
    formValue,
    formState,
    formHasError,
    formRegister,
    formSubmitting,
    changeFormState,
    handleSubmit,
  } = useForm<IniialValuesType>(
    {
      email: '',
      password: '',
      passwordCheck: '',
    },
    {
      validation: {
        email: {
          required: {
            validate: validate.isRequired,
            helperText: '이메일을 입력해주세요',
          },
          form: {
            validate: validate.isEmailForm,
            helperText: '이메일 형식이 올바르지 않습니다.',
          },
          duplicate: {
            validate: duplicateCheckEmail,
            helperText: '이메일 중복확인을 해주세요.',
          },
        },
        password: {
          required: {
            validate: validate.isRequired,
            helperText: '비밀번호를 입력해주세요.',
          },
        },
        passwordCheck: {
          required: {
            validate: validate.isRequired,
            helperText: '비밀번호 확인 입력해주세요.',
          },
          same: {
            validate: (value, { deps }) => {
              return deps.password === value;
            },
            helperText: '비밀번호가 일치하지 않습니다.',
            deps: ['password'],
          },
        },
      },
    },
  );

  const handleClickCheckDuplicateEmail = async () => {
    if (!validate.isEmailForm(formValue.email)) return;

    setIsLoadingDuplicateCheckEmail(true);
    // 이메일 중복 확인
    try {
      const isNotDuplicateEmail = await validate.isEmailNotDuplicate(
        formValue.email,
      );

      if (!isNotDuplicateEmail) {
        changeFormState('email', {
          error: true,
          helperText: '중복된 이메일입니다.',
        });
      } else {
        changeFormState('email', {
          error: false,
          helperText: '중복확인이 완료되었습니다.',
        });
      }

      setDuplicateCheckEmail(isNotDuplicateEmail);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingDuplicateCheckEmail(false);
    }
  };

  const testMutate = async (value: IniialValuesType) => {
    return await new Promise<{
      status: number;
      success: boolean;
    }>(resolve =>
      setTimeout(
        () =>
          resolve({
            status: 200,
            success: true,
          }),
        1000,
      ),
    );
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={event =>
          handleSubmit({
            event: event,
            mutate: testMutate,
            onError(error) {},
            onSubmit(resultData) {},
          })
        }
      >
        <div style={{ marginBottom: 20 }}>
          <TextField
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            error={formState.email.error}
            {...formRegister('email', {
              onChange() {
                setDuplicateCheckEmail(false);
              },
            })}
          />
          <Button
            type="button"
            onClick={handleClickCheckDuplicateEmail}
            disabled={
              !validate.isEmailForm(formValue.email) ||
              isLoadingDuplicateCheckEmail
            }
          >
            {duplicateCheckEmail ? '확인완료' : '중복확인'}
          </Button>
          <p>{formState.email.helperText}</p>
        </div>
        <div>
          <TextField
            type="text"
            placeholder="비밀번호를 입력해주세요."
            error={formState.password.error}
            {...formRegister('password')}
          />
          <p>{formState.password.helperText}</p>
          <TextField
            type="text"
            placeholder="비밀번호를 한번 더 입력해주세요."
            error={formState.passwordCheck.error}
            {...formRegister('passwordCheck')}
          />
          <p>{formState.passwordCheck.helperText}</p>
        </div>
        <SubmitButton type="submit" disabled={formSubmitting}>
          제출
        </SubmitButton>
      </form>
    </div>
  );
};
const TextField = styled.input<{ error?: boolean }>(({ error = false }) => {
  return {
    border: 1,
    borderStyle: 'solid',
    borderColor: !error ? '#222222' : '#ff0000',
    padding: '8px 10px',
    '&:focus': {
      outline: 0,
    },
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  };
});
const Button = styled.button(() => {
  return {
    marginTop: 30,
    padding: '8px 14px',
    background: '#222222',
    color: '#ffffff',
    borderRadius: 40,
    '&:disabled': {
      background: '#cccccc',
    },
  };
});
const SubmitButton = styled.button(() => {
  return {
    marginTop: 30,
    padding: '8px 14px',
    background: '#222222',
    color: '#ffffff',
    borderRadius: 40,
    '&:disabled': {
      background: '#cccccc',
    },
  };
});

export default TestLoginPage;
