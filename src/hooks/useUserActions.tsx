import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';

import useUserStore from '@/stores/userStore';

import { layerPopup } from '@common/layerPopup';

import { LoginResponseType, SocialLoginProviderType } from '@/app/login/types';
import { GetUserResponseSchema, ProfileFormType } from '@/components/myPage/profile/types';

const BASE_URL = 'https://hakunamatatarot.com/api/v1/user';
const ACCESS_TOKEN = nookies.get(null, 'accessToken').accessToken;

const useUserActions = () => {
  const { setUser, resetUser } = useUserStore();
  const router = useRouter();

  const redirectToSocialLogin = (provider: SocialLoginProviderType) => {
    fetch(`${BASE_URL}/auth/${provider}/`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(res => router.push(provider === 'kakao' ? res.auth_url : res.naver_login_url));
  };

  const login = useCallback(
    ({ provider, code }: { provider: SocialLoginProviderType; code: string }) => {
      fetch(`${BASE_URL}/auth/${provider}/callback/?code=${code}`)
        .then(res => res.json())
        .then(
          ({
            access_token: accessToken,
            user_data: { nickname, gender, birthday },
          }: LoginResponseType) => {
            const user = { nickname, gender, birthday };
            setUser({ user, accessToken });
          },
        )
        .catch(() =>
          layerPopup({
            type: 'alert',
            content: (
              <>
                로그인에 실패하였습니다.
                <br />
                다시 시도해 주세요.
              </>
            ),
          }),
        )
        .finally(() => router.push('/'));
    },
    [router, setUser],
  );

  const logout = () => resetUser();

  const getUser = () => {
    fetch(BASE_URL, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } })
      .then(res => res.json())
      .then(({ nickname, birthday, gender }: GetUserResponseSchema) => {
        const user = { nickname, birthday, gender };
        setUser({ user });
      })
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

  const editProfile = (user: ProfileFormType) => {
    fetch(BASE_URL, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(({ status }) => {
        if (status === 'success') {
          setUser({ user });
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
