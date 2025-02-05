import React from 'react';
import { twMerge } from 'tailwind-merge';
import useIsMobile from '@/hooks/useIsMobile';
import { Check } from 'lucide-react';
import RadioInputProps from './types';
import InputWrapper from '../inputWrapper';
import { radioCheckboxStyles, radioGroupStyles, radioItemStyles } from './radioInputStyles';

const RadioInput: React.FC<RadioInputProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  name,
  className,
  ...rest
}) => {
  const { isMobile } = useIsMobile();
  if (isMobile === null) return null;

  return (
    <InputWrapper id={id} label={label} isRadioButton={true}>
      <div className={twMerge(radioGroupStyles({ isMobile }), className)}>
        {options.map(option => (
          <label key={option.value} className={twMerge(radioItemStyles({ isMobile }))}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only"
              {...rest}
            />
            <div
              className={twMerge(
                radioCheckboxStyles({
                  isMobile,
                }),
              )}
            >
              {value === option.value && (
                <Check className="text-deepPink" size={isMobile ? 16 : 20} strokeWidth={3} />
              )}
            </div>
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </InputWrapper>
  );
};

export default RadioInput;
