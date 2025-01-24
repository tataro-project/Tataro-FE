type SocialLoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: '카카오' | '네이버';
  className?: string;
};

export default SocialLoginButtonProps;
