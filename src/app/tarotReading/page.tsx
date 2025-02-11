'use client';

import { twMerge } from 'tailwind-merge';

import TarotChatroom from '@/components/tarotReading/tarotChatroom';
import useScreenWidth from '@/hooks/useScreenWidth';

import ContentBox from '@common/contentBox';

const TarotReading = () => {
  const { isMobile } = useScreenWidth();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <ContentBox size="max-w-[640px] h-full max-h-[784px]" layout="gap-10">
        <div className="flex flex-col justify-between w-full h-full">
          <div
            className={twMerge(
              'py-2 border-b border-purple font-lilita text-center text-cream stroke',
              isMobile ? 'text-3xl' : 'text-4xl',
            )}
          >
            TATARO
          </div>
          <div className="flex-grow overflow-hidden text-purple">
            <TarotChatroom />
          </div>
        </div>
      </ContentBox>
    </div>
  );
};

export default TarotReading;
