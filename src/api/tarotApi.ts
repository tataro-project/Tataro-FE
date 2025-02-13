import { parseCookies } from 'nookies';

import { API } from '@/api/constants';

const getAccessToken = () => {
  const cookies = parseCookies();
  return cookies.accessToken;
};

export const initTarot = async (content: string) => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.TAROT.INIT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to initialize tarot');
  }

  return response.json();
};
