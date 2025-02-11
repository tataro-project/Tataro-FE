'use client';

import { twMerge } from 'tailwind-merge';

import buttonStyles from './buttonStyles';

import ButtonProps from './types';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isSelected = false,
  isReviewed = false,
  type = 'button',
  className,
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    className={twMerge(buttonStyles({ variant, isSelected, isReviewed, disabled }), className)}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
