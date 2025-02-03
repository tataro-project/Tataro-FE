import { twMerge } from 'tailwind-merge';
import { labelStyles } from './labelStyles';

type InputWrapperProps = {
  id?: string;
  label?: string;
  isMobile: boolean;
  children: React.ReactNode;
};

const InputWrapper = ({ id, label, isMobile, children }: InputWrapperProps) => (
  <div className={twMerge('flex justify-center items-center w-full', isMobile ? 'gap-3' : 'gap-6')}>
    <div className="w-28 flex justify-end">
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
