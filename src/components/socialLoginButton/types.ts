import { OAuthProviderType } from '@/app/login/types';

type SocialLoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  OAuthProvider: OAuthProviderType;
  className?: string;
};

export default SocialLoginButtonProps;
