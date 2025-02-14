import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import useUserStore, { UserDataType } from '@/stores/userStore';
import { getAccessToken } from '@/utils/auth';

import { layerPopup } from '@common/layerPopup';

import { LoginResponseType, SocialLoginProviderType } from '@/app/login/types';
import { ProfileFormType } from '@/components/myPage/profile/types';
import { API } from '@/api/constants';

const useUserActions = () => {
  const { user, setUser, resetUser } = useUserStore.getState();
  const router = useRouter();

  const accessToken = getAccessToken();

  const redirectToSocialLogin = (provider: SocialLoginProviderType) => {
    fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.REDIRECT(provider)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(res => router.push(provider === 'kakao' ? res.auth_url : res.naver_login_url));
  };

  const login = useCallback(
    ({ provider, code }: { provider: SocialLoginProviderType; code: string }) => {
      fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.LOGIN(provider, code)}`)
        .then(res => res.json())
        .then(({ access_token: accessToken, user_data: user }: LoginResponseType) => {
          setUser({ user, accessToken });
          router.push('/');
        })
        .catch(() => {
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
        });
    },
    [router, setUser],
  );

  const logout = () => resetUser();

  const getUser = () => {
    fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(res => res.json())
      .then((user: UserDataType) => setUser({ user }))
      .catch(() =>
        layerPopup({
          type: 'alert',
          content: (
            <>
              회원 정보를 가져오는 데 실패하였습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>
          ),
        }),
      );
  };

  const editProfile = (userProfileData: ProfileFormType) => {
    if (!user) return;

    fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.BASE}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(userProfileData),
    })
      .then(res => res.json())
      .then(({ status }) => {
        if (status === 'success') {
          setUser({ user: { ...user, ...userProfileData } });
          layerPopup({ content: '회원 정보가 성공적으로 수정되었습니다!' });
        }
      })
      .catch(() =>
        layerPopup({
          type: 'alert',
          content: (
            <>
              회원 정보를 수정하는 데 실패하였습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </>
          ),
        }),
      );
  };

  return { redirectToSocialLogin, login, logout, getUser, editProfile };
};

export default useUserActions;
