import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import TarotChatDetail from '@/components/tarotReading/tarotChatDetail';
import useScreenWidth from '@/hooks/useScreenWidth';

import { layerCard } from '@common/layerCard';

import CardBack from '@images/CardBack.svg';

import { ChatBubbleProps } from './types';

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isChatbot, tarotCard }) => {
  const { isMobile } = useScreenWidth();

  return (
    <div className={twMerge(`flex`, isChatbot ? 'justify-start' : 'justify-end')}>
      <div
        className={twMerge(
          `px-4 py-2 rounded-2xl shadow-md text-purple font-gMedium`,
          'break-words whitespace-normal',
          isChatbot ? 'bg-cream' : 'bg-lightBlue',
          isMobile ? 'max-w-72 text-sm' : 'max-w-80 text-base',
        )}
      >
        {tarotCard ? (
          <div
            className="flex items-start gap-4"
            onClick={() => {
              layerCard({
                content: <TarotChatDetail />,
                size: 'max-w-[680px] max-h-[800px]',
              });
            }}
          >
            <div className="relative w-24 h-40 rounded-lg flex-shrink-0 select-none">
              <Image
                src={tarotCard.url || CardBack}
                alt="tarotCard"
                layout="fill"
                objectFit="cover"
                draggable="false"
                style={{
                  transform: tarotCard?.direction === '역방향' ? 'rotate(180deg)' : 'none',
                }}
              />
            </div>
            <div className="flex flex-col justify-start items-center gap-12">
              <div className="pt-4">{tarotCard.name} 카드</div>
              <div className="text-xs select-none">{message}</div>
            </div>
          </div>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
