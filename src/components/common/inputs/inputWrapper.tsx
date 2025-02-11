import { twMerge } from 'tailwind-merge';

import useScreenWidth from '@/hooks/useScreenWidth';

import { labelStyles } from './labelStyles';

type InputWrapperProps = {
  id?: string;
  label?: string;
  children: React.ReactNode;
  error?: string;
};

const InputWrapper = ({ id, label, children, error }: InputWrapperProps) => {
  const { isMobile } = useScreenWidth();

  if (isMobile === null) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-start gap-1 sm:gap-6 shrink-0 w-full sm:h-16">
      <div className="flex justify-end items-center gap-4 max-sm:flex-1 sm:w-28">
        {label && (
          <label htmlFor={id} className={twMerge(labelStyles({ isMobile }))}>
            {label}
          </label>
        )}
        {error && (
          <span className="hidden max-sm:block font-gMedium text-red-600 text-xs">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default InputWrapper;
