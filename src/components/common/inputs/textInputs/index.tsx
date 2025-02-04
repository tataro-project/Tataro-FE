import React from 'react';
import { twMerge } from 'tailwind-merge';
import useIsMobile from '@/hooks/useIsMobile';
import TextInputProps from './types';
import { textInputStyles } from './textInputStyles';
import InputWrapper from '../inputWrapper';

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, type = 'text', value, className, error, ...rest }, ref) => {
    const { isMobile } = useIsMobile();
    if (isMobile === null) return null;
    return (
      <InputWrapper id={id} label={label} isMobile={isMobile} error={error}>
        <div className={twMerge('w-96 ', isMobile && 'w-full sm:w-96')}>
          <div className="flex flex-col">
            <input
              id={id}
              type={type}
              value={value}
              ref={ref}
              autoComplete="off"
              className={twMerge(textInputStyles({ isMobile }), className)}
              {...rest}
            />
            {error && (
              <span className="text-red-500 text-sm mt-2  max-sm:hidden block ">{error}</span>
            )}
          </div>
        </div>
      </InputWrapper>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
