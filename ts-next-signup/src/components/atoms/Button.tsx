import { forwardRef, memo, ReactNode, ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
}

interface ButtonProps extends Partial<ButtonBaseProps> {
  children?: ReactNode;
}

const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        children,
        type = 'button',
        size = 'large',
        fullWidth = false,
        ...buttonProps
      },
      rootRef,
    ) => {
      return (
        <SButtonBase
          ref={rootRef}
          type={type}
          size={size}
          fullWidth={fullWidth}
          {...buttonProps}
        >
          {children}
        </SButtonBase>
      );
    },
  ),
);

export default Button;

const BUTTON_SIZE_STYLES = {
  small: {
    fontSize: 14,
    padding: '0px 10px',
    height: 36,
  },
  medium: {
    fontSize: 15,
    padding: '0px 16px',
    height: 44,
  },
  large: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: '0px 22px',
    height: 56,
  },
};

const SButtonBase = styled.button<ButtonBaseProps>(({ size, fullWidth }) => {
  return {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b89ff',
    color: '#ffffff',
    borderRadius: 4,
    ...(fullWidth && { width: '100%' }),
    ...BUTTON_SIZE_STYLES[size],
    '&:active': {
      backgroundColor: '#2771df',
    },
  };
});
