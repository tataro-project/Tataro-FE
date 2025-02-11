import React from 'react';
import { Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useScreenWidth from '@/hooks/useScreenWidth';

import InputWrapper from '../inputWrapper';
import { radioCheckboxStyles, radioGroupStyles, radioItemStyles } from './radioInputStyles';

import RadioInputProps from './types';

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>(
  ({ id, label, options, value, onChange, name, className, error, ...rest }, ref) => {
    const { isInit, isMobile } = useScreenWidth();

    if (!isInit) return null;

    return (
      <InputWrapper id={id} label={label} error={error}>
        <div className={twMerge(radioGroupStyles({ isMobile }), className)}>
          <div className="flex gap-6">
            {options.map(option => (
              <label key={option.value} className={twMerge(radioItemStyles({ isMobile }))}>
                <input
                  ref={ref}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  className="sr-only"
                  {...rest}
                />
                <div className={twMerge(radioCheckboxStyles({ isMobile }))}>
                  {value === option.value && (
                    <Check className="text-deepPink" size={isMobile ? 16 : 20} strokeWidth={3} />
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {error && (
            <span className="block max-sm:hidden mt-2 font-gMedium text-red-600 text-sm">
              {error}
            </span>
          )}
        </div>
      </InputWrapper>
    );
  },
);

RadioInput.displayName = 'RadioInput';

export default RadioInput;
