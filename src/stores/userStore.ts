import nookies from 'nookies';
import { create } from 'zustand';

export type UserDataType = {
  email: string;
  nickname: string;
  birthday: string;
  gender: 'male' | 'female' | null;
};

type UserState = {
  user: UserDataType | null;

  setUser: (loginResponse: { user: UserDataType; accessToken?: string }) => void;
  resetUser: () => void;
};

const useUserStore = create<UserState>(set => {
  let initialUser = null;

  if (typeof window !== 'undefined') {
    const userFromSessionStorage = sessionStorage.getItem('user');
    initialUser = userFromSessionStorage ? JSON.parse(userFromSessionStorage) : null;
  }

  // 창 닫기 및 탭 닫기 시 accessToken 초기화 로직 구현 필요

  return {
    user: initialUser,

    setUser: ({ user, accessToken }) => {
      const formattedUser = {
        ...user,
        birthday: user.birthday ? user.birthday.split('T')[0] : user.birthday,
      };
      set({ user: formattedUser });

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify(user));

        if (accessToken) {
          const expirationTime = 1000 * 60 * 60;

          nookies.set(null, 'accessToken', accessToken, {
            maxAge: expirationTime / 1000,
            path: '/',
            secure: true,
            sameSite: 'Lax',
          });
          setTimeout(() => sessionStorage.removeItem('user'), expirationTime);
        }
      }
    },

    resetUser: () => {
      set({ user: null });

      if (typeof window !== 'undefined') {
        nookies.destroy(null, 'accessToken');
        sessionStorage.removeItem('user');
      }
    },
  };
});

export default useUserStore;
