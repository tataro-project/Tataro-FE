import { twMerge } from 'tailwind-merge';
import { labelStyles } from './labelStyles';

type InputWrapperProps = {
  id?: string;
  label?: string;
  isMobile: boolean;
  children: React.ReactNode;
};

const InputWrapper = ({ id, label, isMobile, children }: InputWrapperProps) => (
  <div
    className={twMerge(
      'flex justify-center items-center w-full',
      isMobile ? 'gap-1 sm:gap-6 flex-col sm:flex-row items-start' : 'gap-6',
    )}
  >
    <div className={twMerge('flex justify-end', isMobile ? 'max-sm:flex-1 sm:w-28 ' : 'w-28')}>
      {label && (
        <label htmlFor={id} className={twMerge(labelStyles({ isMobile }))}>
          {label}
        </label>
      )}
    </div>
    {children}
  </div>
);

export default InputWrapper;
