import { ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';

import useUserStore, { UserDataType } from '@/stores/userStore';
import { fetchWithAccessToken, getAccessToken, getRefreshToken } from '@/utils/auth';

import { layerPopup } from '@common/layerPopup';

import { LoginResponseType, OAuthProviderType } from '@/app/login/types';
import { ProfileFormType } from '@/components/myPage/profile/types';
import { ERROR_MESSAGES, INFO_MESSAGES } from './constants';
import { API } from '@/api/constants';

const useUserActions = () => {
  const { setUser, resetUser, setAccessToken, setRefreshToken } = useUserStore(
    useShallow(state => ({
      setUser: state.setUser,
      resetUser: state.resetUser,
      setAccessToken: state.setAccessToken,
      setRefreshToken: state.setRefreshToken,
    })),
  );
  const router = useRouter();

  const handleError = useCallback(
    (error: unknown, errorMessage: ReactNode, redirectToLogin = true) => {
      const isRefreshTokenMissing =
        error instanceof Error && error.message === 'No refresh token found';

      layerPopup({
        type: 'alert',
        content: isRefreshTokenMissing ? ERROR_MESSAGES.NO_REFRESH_TOKEN : errorMessage,
        onConfirmClick: () => {
          if (isRefreshTokenMissing) {
            resetUser();
            router.push('/login');
            return;
          }
          if (redirectToLogin) router.push('/login');
        },
      });
    },
    [router, resetUser],
  );

  const redirectToSocialLogin = async (OAuthProvider: OAuthProviderType) => {
    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.REDIRECT(OAuthProvider)}`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch the redirect URL');

      const data = await response.json();

      router.push(data.auth_url);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.GENERAL_ERROR);
    }
  };

  const login = useCallback(
    async ({ OAuthProvider, code }: { OAuthProvider: OAuthProviderType; code: string }) => {
      try {
        const response = await fetch(
          `${API.BASE_URL}${API.ENDPOINTS.USER.LOGIN(OAuthProvider, code)}`,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (!response.ok) throw new Error('Failed to login');

        const {
          user_data: user,
          access_token: accessToken,
          kakao_refresh_token: kakaoRefreshToken,
          naver_refresh_token: naverRefreshToken,
        }: LoginResponseType = await response.json();

        setUser({ user });
        setAccessToken({ accessToken });
        setRefreshToken({ kakaoRefreshToken, naverRefreshToken });

        router.push('/');
      } catch (error) {
        handleError(error, ERROR_MESSAGES.LOGIN_FAILED);
      }
    },
    [router, setUser, setAccessToken, setRefreshToken, handleError],
  );

  const logout = () => resetUser();

  const getUser = async () => {
    const requestGetUser = () => {
      const accessToken = getAccessToken();

      return fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    };

    try {
      const response = await fetchWithAccessToken(requestGetUser);

      if (!response.ok) throw new Error('Failed to fetch user information');

      const user: UserDataType = await response.json();
      setUser({ user });
    } catch (error: unknown) {
      handleError(error, ERROR_MESSAGES.FETCH_USER_FAILED, false);
    }
  };

  const editProfile = async (userProfileData: ProfileFormType) => {
    const requestEditProfile = () => {
      const accessToken = getAccessToken();

      return fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfileData),
      });
    };

    try {
      const response = await fetchWithAccessToken(requestEditProfile);

      if (!response.ok) throw new Error('Failed to edit the profile');

      const userData: UserDataType = await response.json();
      setUser({ user: userData });

      layerPopup({ content: INFO_MESSAGES.EDIT_PROFILE_SUCCEEDED });
    } catch (error) {
      handleError(error, ERROR_MESSAGES.EDIT_PROFILE_FAILED, false);
    }
  };

  const deleteUser = async () => {
    const requestDeleteUser = () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();

      return fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    };

    try {
      const response = await fetchWithAccessToken(requestDeleteUser);

      if (!response.ok) throw new Error('Failed to delete the user');

      const { status } = await response.json();

      if (status === 'success') {
        resetUser();

        layerPopup({
          content: INFO_MESSAGES.DELETE_USER_SUCCEEDED,
          onConfirmClick: () => router.push('/'),
        });
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.DELETE_USER_FAILED, false);
    }
  };

  return { redirectToSocialLogin, login, logout, getUser, editProfile, deleteUser };
};

export default useUserActions;
