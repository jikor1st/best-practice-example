import styled from '@emotion/styled';

interface FormLegendProps {
  legend?: string;
}

const FormLegend = ({ legend }: FormLegendProps) => {
  return <SFormLegend>{legend}</SFormLegend>;
};

export default FormLegend;

const SFormLegend = styled.legend(() => {
  return {
    overflow: 'hidden',
    position: 'absolute',
    width: 0,
    height: 0,
    lineHeight: 0,
    fontSize: 0,
    textIndex: -9999,
  };
});
