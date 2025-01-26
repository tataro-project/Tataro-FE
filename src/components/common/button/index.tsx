'use client';

import { twMerge } from 'tailwind-merge';
import ButtonProps from './types';
import buttonStyles from './buttonStyles';
import useIsMobile from '@/hooks/useIsMobile';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isSelected = false,
  isReviewed = false,
  type = 'button',
  className,
  disabled = false,
  ...props
}) => {
  const { isMobile } = useIsMobile();

  if (isMobile === null) return null;

  return (
    <button
      type={type}
      className={twMerge(
        buttonStyles({ variant, isSelected, isReviewed, isMobile, disabled }),
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
