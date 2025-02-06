import { HTMLAttributes } from 'react';

type CheckboxInputProps = HTMLAttributes<HTMLInputElement> & {
  label: string;
  value: boolean;
  error?: string;
};

export default CheckboxInputProps;
