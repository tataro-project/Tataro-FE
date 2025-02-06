import React from 'react';
import { twMerge } from 'tailwind-merge';
import useIsMobile from '@/hooks/useIsMobile';
import TextInputProps from './types';
import { textInputStyles } from './textInputStyles';
import InputWrapper from '../inputWrapper';

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, type = 'text', value, className, ...rest }, ref) => {
    const { isMobile } = useIsMobile();
    if (isMobile === null) return null;
    return (
      <InputWrapper id={id} label={label} isMobile={isMobile}>
        <div className={twMerge('flex gap-4', isMobile ? 'w-full' : 'w-96')}>
          <input
            id={id}
            type={type}
            value={value}
            ref={ref}
            className={twMerge(textInputStyles({ isMobile }), className)}
            {...rest}
          />
        </div>
      </InputWrapper>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
