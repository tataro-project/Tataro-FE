import { twMerge } from 'tailwind-merge';
import { labelStyles } from './labelStyles';
import useIsMobile from '@/hooks/useIsMobile';
import clsx from 'clsx';

type InputWrapperProps = {
  id?: string;
  label?: string;
  children: React.ReactNode;
  error?: string;
  isRadioButton?: boolean;
};

const InputWrapper = ({ id, label, children, error, isRadioButton = false }: InputWrapperProps) => {
  const { isMobile } = useIsMobile();

  if (isMobile === null) return null;

  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col sm:flex-row justify-center items-start gap-1 sm:gap-6 w-full sm:h-16',
          isRadioButton && 'sm:h-fit',
        ),
      )}
    >
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
