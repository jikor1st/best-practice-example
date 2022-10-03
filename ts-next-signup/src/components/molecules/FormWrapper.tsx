import { ReactNode, ComponentProps, FormHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { FormFieldset, FormLegend } from '@/components/atoms';

interface FormWrapperProps
  extends FormHTMLAttributes<HTMLFormElement>,
    ComponentProps<typeof FormFieldset>,
    ComponentProps<typeof FormLegend> {
  children: ReactNode;
}

const FormWrapper = ({
  children,
  legend,
  noValidate = true,
  onSubmit,
  ...fieldsetProps
}: FormWrapperProps) => {
  return (
    <SForm noValidate={noValidate} onSubmit={onSubmit}>
      <FormFieldset {...fieldsetProps}>
        {legend && <FormLegend legend={legend} />}
        {children}
      </FormFieldset>
    </SForm>
  );
};

export default FormWrapper;

const SForm = styled.form(() => {
  return {};
});
