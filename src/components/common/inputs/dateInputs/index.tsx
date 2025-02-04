import React from 'react';
import { twMerge } from 'tailwind-merge';
import useIsMobile from '@/hooks/useIsMobile';
import DateInputProps from './types';
import InputWrapper from '../inputWrapper';
import { dateInputStyles } from './dateInputStyles';

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ id, label, value, onChange, className, error, ...rest }, ref) => {
    const { isMobile } = useIsMobile();
    if (isMobile === null) return null;
    return (
      <InputWrapper id={id} label={label} isMobile={isMobile} error={error}>
        <div
          className={twMerge(
            'w-96 flex ',
            isMobile ? 'flex flex-col w-full sm:w-96 gap-0 items-start' : 'gap-2',
          )}
        >
          <div>
            <input
              id={id}
              type="date"
              value={value}
              ref={ref}
              onChange={onChange}
              className={twMerge(dateInputStyles({ isMobile }), className)}
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

DateInput.displayName = 'DateInput';

export default DateInput;
