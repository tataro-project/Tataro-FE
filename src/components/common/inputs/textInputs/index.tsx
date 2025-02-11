import React from 'react';
import { twMerge } from 'tailwind-merge';

import useScreenWidth from '@/hooks/useScreenWidth';

import InputWrapper from '../inputWrapper';
import { textInputStyles } from './textInputStyles';

import TextInputProps from './types';

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, type = 'text', value, className, error, ...rest }, ref) => {
    const { isInit, isMobile } = useScreenWidth();

    if (!isInit) return null;

    return (
      <InputWrapper id={id} label={label} error={error}>
        <div className="w-full sm:w-96">
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
              <span className="block max-sm:hidden mt-2 font-gMedium text-red-600 text-sm">
                {error}
              </span>
            )}
          </div>
        </div>
      </InputWrapper>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
