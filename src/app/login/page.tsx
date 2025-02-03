'use client';

import ContentBox from '@common/contentBox';
import SocialLoginButton from '@/components/socialLoginButton';

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ContentBox size="max-w-md max-h-[576px]" layout="gap-10 px-6 pt-10 pb-20">
        <div className="w-full h-48 bg-logo bg-center bg-contain bg-no-repeat" aria-label="로고" />
        <p className="grow content-center font-lilita text-cream text-3xl stroke">LOGIN</p>
        <div className="flex flex-col items-center gap-5 w-full">
          <SocialLoginButton provider="카카오" />
          <SocialLoginButton provider="네이버" />
        </div>
      </ContentBox>
    </div>
  );
};

export default Login;
