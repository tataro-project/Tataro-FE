import { SocialLoginProviderType } from '@/app/login/types';

type SocialLoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: SocialLoginProviderType;
  className?: string;
};

export default SocialLoginButtonProps;
