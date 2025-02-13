import { SocialLoginProviderType } from '@/app/login/types';

export const API = {
  BASE_URL: 'https://hakunamatatarot.com/api/v1',
  ENDPOINTS: {
    USER: {
      BASE: '/user',
      REDIRECT: (provider: SocialLoginProviderType) => `/user/auth/${provider}`,
      LOGIN: (provider: SocialLoginProviderType, code: string) =>
        `/user/auth/${provider}/callback/?code=${code}`,
    },
    TAROT: {
      INIT: '/tarot/init/',
      GENERATE: (id: string) => `/tarot/${id}`,
    },
    REVIEW: {},
    NOTICE: {},
    FAQ: {},
  },
};
