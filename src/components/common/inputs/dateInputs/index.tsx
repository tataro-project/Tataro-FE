import React from 'react';
import { twMerge } from 'tailwind-merge';

import InputWrapper from '../inputWrapper';

import DateInputProps from './types';

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ id, label, value, onChange, className, error, ...rest }, ref) => {
    return (
      <InputWrapper id={id} label={label} error={error}>
        <div className="flex flex-col items-start gap-0 sm:gap-2 w-full sm:w-96">
          <div>
            <input
              id={id}
              type="date"
              value={value}
              ref={ref}
              onChange={onChange}
              className={twMerge(
                'w-full max-w-72 sm:w-fit px-6 sm:px-2 py-1 sm:py-0 border-purple border bg-cream text-purple font-gMedium text-sm sm:text-xl outline-none',
                className,
              )}
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

DateInput.displayName = 'DateInput';

export default DateInput;
