import { UserDataType } from '@/stores/userStore';

export type LoginResponseType = {
  access_token: string;
  kakao_refresh_token: string;
  naver_refresh_token: string;
  created: boolean;
  message: string;
  user_id: number;
  user_data: UserDataType;
};

export type OAuthProviderType = 'kakao' | 'naver';
