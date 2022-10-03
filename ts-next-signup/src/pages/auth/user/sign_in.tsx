import styled from '@emotion/styled';
import { Textfield, Button } from '@/components/atoms';
import { FormWrapper } from '@/components/molecules';
import { PageLayoutProps } from '@/types';

import { useForm } from '@/hooks/service';
import { validate } from '@/utils';

interface IniialValuesType {
  email: string;
  password: string;
}

const SignInPage: PageLayoutProps = () => {
  // const {} = useForm<IniialValuesType>({
  //   email: '',
  //   password: '',
  // });
  return (
    <SContainer>
      <SWrapper>
        <FormWrapper legend="로그인 폼">
          <Textfield
            label={'이메일'}
            type={'email'}
            placeholder="이메일을 입력해주세요"
            helperText=""
            fullWidth
          />
          <Textfield
            label={'비밀번호'}
            type={'password'}
            placeholder="비밀번호를 입력해주세요"
            fullWidth
          />
          <Button fullWidth>로그인</Button>
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

export default SignInPage;
