import { parseCookies } from 'nookies';

import useUserStore from '@/stores/userStore';

import { API } from '@/api/constants';

export const getAccessToken = (): string => {
  const cookies = parseCookies();
  return cookies.accessToken || '';
};

export const getRefreshToken = (): string | undefined => parseCookies().refreshToken;

export const reissueAccessToken = async () => {
  const { OAuthProvider, setAccessToken } = useUserStore.getState();
  if (!OAuthProvider) return;

  const refreshToken = getRefreshToken();

  try {
    if (!refreshToken) throw new Error('No refresh token found');
  } catch (error) {
    throw error;
  }

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.USER.REISSUE(OAuthProvider)}`, {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) throw new Error('Failed to reissue access token');

  const { access_token: accessToken } = await response.json();

  setAccessToken({ accessToken });
};

export const fetchWithAccessToken = async (fetchFunction: () => Promise<Response>) => {
  const { user } = useUserStore.getState();
  const response = await fetchFunction();

  if (response.status === 401 && user) {
    await reissueAccessToken();
    const responseWithNewAccessToken = await fetchFunction();

    return responseWithNewAccessToken;
  }

  return response;
};
