import nookies from 'nookies';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserDataType = {
  id?: string;
  email: string;
  nickname: string;
  birthday: string;
  gender: 'male' | 'female' | null;
  social_type?: 'KAKAO' | 'NAVER';
};

type UserState = {
  user: UserDataType | null;
  timer: NodeJS.Timeout | null;

  setUser: (loginResponse: { user: UserDataType; accessToken?: string }) => void;
  resetUser: () => void;
};

const useUserStore = createStore<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      timer: null,

      setUser: ({ user, accessToken }) => {
        const formattedUser = {
          ...user,
          birthday: user.birthday ? user.birthday.split('T')[0] : user.birthday,
        };
        set({ user: formattedUser });

        if (typeof window !== 'undefined') {
          if (accessToken) {
            const expirationTime = 1000 * 60 * 60;

            nookies.set(null, 'accessToken', accessToken, {
              maxAge: expirationTime / 1000,
              path: '/',
              secure: true,
              sameSite: 'Lax',
            });

            if (get().timer) return;

            const timer = setTimeout(() => {
              set({ user: null });
              localStorage.removeItem('user');
            }, expirationTime);

            set({ timer });
          }
        }
      },

      resetUser: () => {
        const timer = get().timer;
        if (timer) clearTimeout(timer);

        set({ user: null, timer: null });

        if (typeof window !== 'undefined') {
          nookies.destroy(null, 'accessToken', {
            path: '/',
            secure: true,
            sameSite: 'Lax',
          });
          localStorage.removeItem('user');
        }
      },
    }),
    {
      name: 'user',
    },
  ),
);

export default useUserStore;
