import { memo, forwardRef, HTMLInputTypeAttribute, LegacyRef } from 'react';
import styled from '@emotion/styled';

interface ErrorOccur {
  error?: boolean;
}
interface InputBaseProps {
  fullWidth?: boolean;
  inputRef?: LegacyRef<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  as?: 'input' | 'textarea';
}

interface TextFieldProps extends InputBaseProps, ErrorOccur {
  label?: string;
  helperText?: string;
}

const TextField = memo(
  forwardRef<HTMLDivElement, TextFieldProps>(
    (
      { label, type, placeholder, as, fullWidth, helperText, error, inputRef },
      rootRef,
    ) => {
      return (
        <SContainer className="textfield-container" ref={rootRef} error={error}>
          {label && (
            <SLabel className="textfield-label" htmlFor={label}>
              {label}
            </SLabel>
          )}
          <SInputBase
            className="textfield-input-base"
            id={label}
            type={type}
            placeholder={placeholder}
            as={as}
            fullWidth={fullWidth}
            ref={inputRef}
          />
          {helperText && (
            <SHelperText className="textfield-helper-text">
              {helperText}
            </SHelperText>
          )}
        </SContainer>
      );
    },
  ),
);

export default TextField;

const SContainer = styled.div<ErrorOccur>(({ error }) => {
  const errorColor = '#ff0e36';
  return {
    margin: '16px 0 24px',
    position: 'relative',
    ...(error && {
      '& .textfield-label': {
        color: errorColor,
      },
      '& .textfield-input-base': {
        color: errorColor,
        outlineColor: errorColor,
      },
      '& .textfield-helper-text': {
        color: errorColor,
      },
    }),
  };
});

const SLabel = styled.label(() => {
  return {
    display: 'block',
    color: '#4e4e4e',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 16,
    cursor: 'pointer',
  };
});

const SInputBase = styled.input<InputBaseProps>(({ fullWidth }) => {
  return {
    display: 'block',
    height: 56,
    padding: '16px 14px',
    fontSize: 16,
    outlineWidth: 1,
    border: 0,
    outlineStyle: 'solid',
    outlineColor: '#919191',
    borderRadius: 4,
    transition: 'outline-color 200ms ease 0ms',
    '&:hover': {
      outlineWidth: 2,
      outlineColor: '#616161',
    },
    '&:focus': {
      outlineWidth: 2,
      outlineColor: '#3b89ff',
    },
    ...(fullWidth && { width: '100%' }),
  };
});

const SHelperText = styled.p(() => {
  return {
    color: '#7c7c7c',
    marginTop: 10,
  };
});
