import styled from '@emotion/styled';

interface FormLegendProps {
  legend?: string;
}

const FormLegend = ({ legend }: FormLegendProps) => {
  return <SFormLegend>{legend}</SFormLegend>;
};

const SFormLegend = styled.legend(() => {
  return {};
});

export default FormLegend;
