import { getAccessToken } from '@/utils/auth';

import { API } from '@/api/constants';

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

export const reinitTarot = async (roomId: string, content: string) => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.TAROT.REINIT(roomId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to consult tarot');
  }

  return response.json();
};

export const consultTarot = async (roomId: string) => {
  const accessToken = getAccessToken();

  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.TAROT.CONSULT(roomId)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to consult tarot');
  }

  return response.json();
};

export const paginatedTarotChatHistory = async (page: number, perPage: number) => {
  const accessToken = getAccessToken();

  const response = await fetch(
    `${API.BASE_URL}${API.ENDPOINTS.TAROT.ALL_TAROT}?page=${page}&size=${perPage}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch chatlogs');
  }

  return response.json();
};
