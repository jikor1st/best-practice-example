import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper = ({ children }: FormWrapperProps) => {
  return <SFormWrapper>{children}</SFormWrapper>;
};

const SFormWrapper = styled.form(() => {
  return {};
});

export default FormWrapper;
