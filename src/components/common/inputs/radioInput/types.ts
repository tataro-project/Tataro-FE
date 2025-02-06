type Option = {
  value: 'male' | 'female';
  label: string;
};

type RadioInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> & {
  id?: string;
  label?: string;
  options: Option[];
  value?: 'male' | 'female';
  error: string;
};

export default RadioInputProps;
