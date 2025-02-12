import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import kakao from '@images/kakao.svg';
import naver from '@images/naver.svg';

import SocialLoginButtonProps from './types';

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, ...props }) => {
  return (
    <button
      type="button"
      className={twMerge(
        'flex justify-center items-center gap-2 z-10 w-full max-w-80 h-12 px-4 rounded-xl text-lg font-medium',
        provider === 'kakao' ? 'bg-kakao text-kakaoText' : 'bg-naver text-white',
      )}
      {...props}
    >
      <Image src={provider === 'kakao' ? kakao : naver} alt={`${provider} 로고`} width={20} />
      <span className="grow">{provider === 'kakao' ? '카카오' : '네이버'} 로그인</span>
    </button>
  );
};

export default SocialLoginButton;
