'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import useUserActions from '@/hooks/useUserActions';

import LoadingSpinner from '@common/loadingSpinner';

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

const KakaoCallbackWithSuspense = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <KakaoCallback />
    </Suspense>
  );
};

export default KakaoCallbackWithSuspense;
