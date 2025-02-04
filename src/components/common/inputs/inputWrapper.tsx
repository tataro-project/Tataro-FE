import { twMerge } from 'tailwind-merge';
import { labelStyles } from './labelStyles';

type InputWrapperProps = {
  id?: string;
  label?: string;
  isMobile: boolean;
  children: React.ReactNode;
  error?: string;
};

const InputWrapper = ({ id, label, isMobile, children, error }: InputWrapperProps) => (
  <div
    className={twMerge(
      'flex justify-center items-start w-full',
      isMobile ? 'gap-1 sm:gap-6 flex-col sm:flex-row' : 'gap-6',
    )}
  >
    <div
      className={twMerge(
        'flex justify-end gap-4 items-center',
        isMobile ? 'max-sm:flex-1 sm:w-28 ' : 'w-28',
      )}
    >
      {label && (
        <label htmlFor={id} className={twMerge(labelStyles({ isMobile }))}>
          {label}
        </label>
      )}
      {error && <span className="text-red-500 text-xs hidden max-sm:block">{error}</span>}
    </div>
    {children}
  </div>
);

export default InputWrapper;
