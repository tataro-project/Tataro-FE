import { OAuthProviderType } from '@/app/login/types';

export const API = {
  BASE_URL: 'https://hakunamatatarot.com/api/v1',
  ENDPOINTS: {
    USER: {
      BASE: '/user/',
      REDIRECT: (OAuthProvider: OAuthProviderType) => `/user/auth/${OAuthProvider}/`,
      LOGIN: (OAuthProvider: OAuthProviderType, code: string) =>
        `/user/auth/${OAuthProvider}/callback/?code=${code}`,
      REISSUE: (OAuthProvider: OAuthProviderType) => `/user/auth/${OAuthProvider}/reissue/`,
    },
    TAROT: {
      INIT: '/tarot/init/',
      REINIT: (roomId: string) => `/tarot/init/${roomId}/`,
      CONSULT: (roomId: string) => `/tarot/${roomId}/`,
      RECENT_TAROT: `/tarot/logs/first/`,
      PREVIOUS_TAROT: (roomId: string) => `/tarot/logs/${roomId}/`,
      ALL_TAROT: `/tarot/logs/`,
    },
    REVIEW: {
      ALL_REVIEW: `/review/`,
      CREATE_REVIEW: `/review/`,
      REVIEW_DETAIL: (reviewId: number) => `/review/${reviewId}/`,
      UPDATE_REVIEW: (reviewId: number) => `/review/${reviewId}/`,
      DELETE_REVIEW: (reviewId: number) => `/review/${reviewId}/`,
    },
    NOTICE: {},
    FAQ: {},
  },
};
