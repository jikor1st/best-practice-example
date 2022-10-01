import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface FormFieldsetProps {
  disabled?: boolean;
  form?: string;
  name?: string;
  children: ReactNode;
}

const FormFieldset = ({ children, ...rest }: FormFieldsetProps) => {
  return <SFormFieldset {...rest}>{children}</SFormFieldset>;
};

const SFormFieldset = styled.fieldset(() => {
  return {};
});

export default FormFieldset;
