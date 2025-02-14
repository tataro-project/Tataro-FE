import { UserDataType } from '@/stores/userStore';

export type LoginResponseType = {
  access_token: string;
  refresh_token: string;
  created: boolean;
  message: string;
  user_id: number;
  user_data: UserDataType;
};

export type SocialLoginProviderType = 'kakao' | 'naver';
