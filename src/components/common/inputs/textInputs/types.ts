type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  id?: string;
  label?: string;
  type?: 'text' | 'tel';
  value?: string | number;
  error?: string;
};

export default TextInputProps;
