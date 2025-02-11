import { twMerge } from 'tailwind-merge';

import useScreenWidth from '@/hooks/useScreenWidth';

import { ChatBubbleProps } from './types';

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isChatbot }) => {
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
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
