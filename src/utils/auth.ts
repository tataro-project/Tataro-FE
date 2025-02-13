import { parseCookies } from 'nookies';

export const getAccessToken = (): string => {
  const cookies = parseCookies();
  return cookies.accessToken || '';
};
