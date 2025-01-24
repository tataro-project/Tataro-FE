'use client';

import Image from 'next/image';
import logo from '@images/logo.svg';
import Frame from '@common/frame';
import SocialLoginButton from '@/components/socialLoginButton';
import useIsMobile from '@/hooks/useIsMobile';

const Login = () => {
  const { isMobile, isMobileDevice } = useIsMobile();

  if (isMobile === null) return null;

  return (
    <Frame
      size={`${(!isMobile || !isMobileDevice) && 'max-w-md max-h-[612px]'}`}
      className="gap-10 px-6 pt-10 pb-20"
    >
      <Image src={logo} alt="logo" width={384} priority />
      <p className="pt-6 font-menu text-cream text-stroke text-3xl">LOGIN</p>
      <div className="flex flex-col justify-end items-center gap-5 grow w-full">
        <SocialLoginButton provider="카카오" />
        <SocialLoginButton provider="네이버" />
      </div>
    </Frame>
  );
};

export default Login;
