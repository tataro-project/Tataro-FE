import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import useUserStore, { UserDataType } from '@/stores/userStore';
import { getAccessToken } from '@/utils/auth';

import { layerPopup } from '@common/layerPopup';

import { LoginResponseType, OAuthProviderType } from '@/app/login/types';
import { ProfileFormType } from '@/components/myPage/profile/types';
import { API } from '@/api/constants';

const useUserActions = () => {
  const { setUser, resetUser } = useUserStore.getState();
  const router = useRouter();

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
      console.error(error);

      layerPopup({
        type: 'alert',
        content: (
          <>
            오류가 발생하였습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>
        ),
        onConfirmClick: () => router.push('/login'),
      });
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

        const { access_token: accessToken, user_data: user }: LoginResponseType =
          await response.json();
        setUser({ user, accessToken });

        router.push('/');
      } catch (error) {
        console.error(error);

        layerPopup({
          type: 'alert',
          content: (
            <>
              로그인에 실패하였습니다.
              <br />
              다시 시도해 주세요.
            </>
          ),
          onConfirmClick: () => router.push('/login'),
        });
      }
    },
    [router, setUser],
  );

  const logout = () => resetUser();

  const getUser = async () => {
    const accessToken = getAccessToken();

    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user information');

      const user: UserDataType = await response.json();
      setUser({ user });
    } catch (error) {
      console.error(error);

      layerPopup({
        type: 'alert',
        content: (
          <>
            회원 정보를 가져오는 데 실패하였습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>
        ),
      });
    }
  };

  const editProfile = async (userProfileData: ProfileFormType) => {
    const accessToken = getAccessToken();

    try {
      const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfileData),
      });

      if (!response.ok) throw new Error('Failed to edit the profile');

      const user: UserDataType = await response.json();
      setUser({ user });

      layerPopup({ content: '회원 정보가 성공적으로 수정되었습니다!' });
    } catch (error) {
      console.error(error);

      layerPopup({
        type: 'alert',
        content: (
          <>
            회원 정보를 수정하는 데 실패하였습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </>
        ),
      });
    }
  };

  return { redirectToSocialLogin, login, logout, getUser, editProfile };
};

export default useUserActions;
