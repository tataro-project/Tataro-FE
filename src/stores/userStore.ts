import nookies from 'nookies';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { reissueAccessToken } from '@/utils/auth';

import { OAuthProviderType } from '@/app/login/types';

export type UserDataType = {
  id?: string;
  email: string;
  nickname: string;
  birthday: string | null;
  gender: 'male' | 'female' | null;
  social_type?: 'KAKAO' | 'NAVER';
};

type UserState = {
  user: UserDataType | null;
  OAuthProvider: OAuthProviderType | null;

  setUser: (loginResponse: { user: UserDataType }) => void;
  resetUser: () => void;
  setAccessToken: (accessToken: { accessToken: string }) => void;
  setRefreshToken: (refreshToken: {
    kakaoRefreshToken?: string;
    naverRefreshToken?: string;
  }) => void;
};

const EXPIRATION_TIME = 1000 * 60 * 60;

const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      OAuthProvider: null,

      setUser: ({ user }) => {
        const formattedUser = {
          ...user,
          birthday: user.birthday ? user.birthday.split('T')[0] : user.birthday,
        };
        set({ user: formattedUser });
      },

      resetUser: () => {
        set({ user: null });

        if (typeof window !== 'undefined') {
          nookies.destroy(null, 'accessToken', {
            path: '/',
            secure: true,
            sameSite: 'Lax',
          });
          nookies.destroy(null, 'refreshToken', {
            path: '/',
            secure: true,
            sameSite: 'Lax',
          });

          localStorage.removeItem('user');
        }
      },

      setAccessToken: ({ accessToken }) => {
        if (typeof window !== 'undefined') {
          if (accessToken) {
            nookies.set(null, 'accessToken', accessToken, {
              maxAge: EXPIRATION_TIME / 1000,
              path: '/',
              secure: true,
              sameSite: 'Lax',
            });

            setTimeout(() => reissueAccessToken(), EXPIRATION_TIME - 1000 * 60 * 5);
          }
        }
      },

      setRefreshToken: ({ kakaoRefreshToken, naverRefreshToken }) => {
        if (typeof window !== 'undefined') {
          if (kakaoRefreshToken) set({ OAuthProvider: 'kakao' });
          else if (naverRefreshToken) set({ OAuthProvider: 'naver' });

          if (kakaoRefreshToken || naverRefreshToken) {
            const refreshToken = kakaoRefreshToken || naverRefreshToken;

            if (!refreshToken) return;

            nookies.set(null, 'refreshToken', refreshToken, {
              path: '/',
              secure: true,
              sameSite: 'Lax',
            });
          }
        }
      },
    }),
    {
      name: 'user',
    },
  ),
);

export default useUserStore;
