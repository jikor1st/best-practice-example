import styled from '@emotion/styled';
import { Textfield, Button } from '@/components/atoms';
import { FormWrapper } from '@/components/molecules';
import { PageLayoutProps } from '@/types';

import { useForm } from '@/hooks/service';
import { validate } from '@/utils';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';

interface LoginaluesType {
  email: string;
  password: string;
}

interface SignInPageProps {
  query?: {
    redirect_url: string;
  };
}

const SignInPage: PageLayoutProps<SignInPageProps> = ({ query }) => {
  const router = useRouter();
  const redirectBeforeLoginPage = (url?: string) => {
    if (url) {
      router.replace(url);
    } else {
      router.replace('/');
    }
  };

  const {
    formValue,
    formState,
    formRegister,
    handleSubmit,
    changeFormState,
    resetFormState,
  } = useForm<LoginaluesType>(
    {
      email: '',
      password: '',
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
        },
        password: {
          required: {
            validate: validate.isRequired,
            helperText: '비밀번호를 입력해주세요.',
          },
        },
      },
    },
  );

  const testLoginMutate = async ({ email, password }: LoginaluesType) => {
    const validEmail = 'test@email.com';
    const validPassword = '1234';

    let loginSuccess = false;

    if (validEmail === email && validPassword === password) {
      loginSuccess = true;
    }

    return await new Promise<{
      status: number;
      success: boolean;
    }>(resolve =>
      setTimeout(() => {
        resolve({
          status: 200,
          success: loginSuccess,
        });
      }, 1000),
    );
  };
  return (
    <SContainer>
      <SWrapper>
        <FormWrapper
          legend="로그인 폼"
          onSubmit={event =>
            handleSubmit({
              event: event,
              mutate: testLoginMutate,
              onError(error) {
                console.error(error);
              },
              onSubmit({ status, success }) {
                resetFormState('password');
                if (status !== 200) {
                  // 통신 실패
                  changeFormState('email', {
                    error: true,
                    helperText: '잠시후 다시 시도해주세요.',
                  });
                  return;
                }

                if (status === 200 && !success) {
                  // 로그인 실패(통신 성공)
                  changeFormState('email', {
                    error: true,
                    helperText: '이메일 또는 비밀번호가 일치하지 않습니다.',
                  });
                  return;
                }

                if (status === 200 && success) {
                  // 로그인 성공(통신 성공)
                  redirectBeforeLoginPage(query?.redirect_url);
                  return;
                }
              },
            })
          }
        >
          <Textfield
            label={'이메일'}
            type={'email'}
            placeholder="이메일을 입력해주세요"
            error={formState.email.error}
            helperText={formState.email.helperText}
            fullWidth
            {...formRegister('email')}
          />
          <Textfield
            {...formRegister('password')}
            label={'비밀번호'}
            type={'password'}
            placeholder="비밀번호를 입력해주세요"
            error={formState.password.error}
            helperText={formState.password.helperText}
            fullWidth
          />
          <Button fullWidth type="submit">
            로그인
          </Button>
        </FormWrapper>
      </SWrapper>
    </SContainer>
  );
};

const SContainer = styled.section(() => {
  return {
    padding: '0 20px',
  };
});
const SWrapper = styled.div(() => {
  return {
    width: '100%',
    maxWidth: 320,
    margin: '200px auto 0',
  };
});

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};

export default SignInPage;
