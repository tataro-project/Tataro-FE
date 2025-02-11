import React from 'react';
import { Check } from 'lucide-react';

import useScreenWidth from '@/hooks/useScreenWidth';

import CheckboxInputProps from './types';

const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, value, error, ...props }, ref) => {
    const { isInit, isMobile } = useScreenWidth();

    if (!isInit) return null;

    return (
      <div className="flex gap-2">
        <label htmlFor={props.id} className="flex gap-2 cursor-pointer">
          <input
            {...props}
            ref={ref}
            type="checkbox"
            id={props.id}
            className="sr-only"
            checked={value}
          />
          <div className="flex justify-center items-center shrink-0 size-4 sm:size-5 border border-purple rounded-sm bg-cream">
            {value && <Check className="text-deepPink" size={isMobile ? 14 : 16} strokeWidth={3} />}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-gMedium text-purple text-sm sm:text-base">{label}</span>
            {error && <span className="font-gMedium text-red-600 text-xs sm:text-sm">{error}</span>}
          </div>
        </label>
      </div>
    );
  },
);

CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;
