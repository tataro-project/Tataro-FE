'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import useUserActions from '@/hooks/useUserActions';

const KakaoCallback = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { login } = useUserActions();

  useEffect(() => {
    if (!code) return;

    login({ provider: 'kakao', code });
  }, [code, login]);

  return <></>;
};

export default KakaoCallback;
