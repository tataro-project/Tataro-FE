import { OAuthProviderType } from '@/app/login/types';

export const API = {
  BASE_URL: 'https://hakunamatatarot.com/api/v1',
  ENDPOINTS: {
    USER: {
      BASE: '/user',
      REDIRECT: (OAuthProvider: OAuthProviderType) => `/user/auth/${OAuthProvider}`,
      LOGIN: (OAuthProvider: OAuthProviderType, code: string) =>
        `/user/auth/${OAuthProvider}/callback/?code=${code}`,
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
