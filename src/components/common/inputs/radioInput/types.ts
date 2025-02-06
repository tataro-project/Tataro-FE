type Option = {
  value: string;
  label: string;
};

type RadioInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> & {
  id?: string;
  label?: string;
  options: Option[];
  value?: string;
};

export default RadioInputProps;
