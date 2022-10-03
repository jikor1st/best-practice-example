import { ReactNode, ComponentProps } from 'react';
import styled from '@emotion/styled';
import { FormFieldset, FormLegend } from '@/components/atoms';

interface FormWrapperProps
  extends ComponentProps<typeof FormFieldset>,
    ComponentProps<typeof FormLegend> {
  children: ReactNode;
}

const FormWrapper = ({
  children,
  legend,
  ...fieldsetProps
}: FormWrapperProps) => {
  return (
    <SFormWrapper>
      <FormFieldset {...fieldsetProps}>
        {legend && <FormLegend legend={legend} />}
        {children}
      </FormFieldset>
    </SFormWrapper>
  );
};

export default FormWrapper;

const SFormWrapper = styled.form(() => {
  return {};
});
