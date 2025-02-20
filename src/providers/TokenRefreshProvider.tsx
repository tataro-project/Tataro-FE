import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import useUserStore from '@/stores/userStore';
import { getAccessToken, getRefreshToken, reissueAccessToken } from '@/utils/auth';

import ProviderProps from './types';

const TokenRefreshProvider = ({ children }: ProviderProps) => {
  const user = useUserStore(useShallow(state => state.user));

  useEffect(() => {
    const refreshToken = getRefreshToken();
    const accessToken = getAccessToken();

    const refresh = async () => {
      if (user && refreshToken && !accessToken) {
        await reissueAccessToken();
      }
    };

    refresh();
  }, [user]);

  return <>{children}</>;
};

export default TokenRefreshProvider;
