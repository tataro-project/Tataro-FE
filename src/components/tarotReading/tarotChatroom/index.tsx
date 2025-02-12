import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import useScreenWidth from '@/hooks/useScreenWidth';

import Button from '@common/button';
import ChatBubble from '@common/chatBubble';
import ChatInput from '@common/inputs/chatInput';

import TarotAnimation from '../tarotAnimation';

import { ChatBubbleProps } from '@common/chatBubble/types';
import { initialChatbotMessages } from '../constants';

const TarotChatroom = () => {
  const { isMobile } = useScreenWidth();

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatBubbleProps[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    initialChatbotMessages.forEach((chat, index) => {
      setTimeout(
        () => {
          setChatHistory(prev => [...prev, chat]);
        },
        500 + index * 1000,
      );
    });

    setTimeout(() => {
      setShowOptions(true);
    }, 2500);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory(prev => {
        const updatedChatHistory = prev.map(msg => ({ ...msg, showButton: false }));
        return [...updatedChatHistory, { message, isChatbot: false, showButton: true }];
      });
      setMessage('');
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === '고민없어') {
      setChatHistory(prev => [...prev, { message: '고민없어', isChatbot: false }]);
      setShowOptions(false);
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { message: '고민이 생기면 나를 찾아와', isChatbot: true },
        ]);
      }, 1000);
    } else {
      setShowInput(true);
      setShowOptions(false);
    }
  };

  const handleCompleteInput = () => {
    setChatHistory(prev => {
      const updatedHistory = prev.map(msg => ({ ...msg, showButton: false }));
      return updatedHistory;
    });
    setShowInput(false);

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { message: '고민을 생각하며 카드를 한장 뽑아봐', isChatbot: true },
      ]);
      setShowAnimation(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-between gap-2 w-full h-full">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-3 p-4 pb-2">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <ChatBubble {...chat} />
              {chat.showButton && (
                <div className="flex justify-end mt-2">
                  <Button variant="chatroom" onClick={handleCompleteInput}>
                    입력완료
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div ref={chatEndRef} />
      </div>
      {showOptions && (
        <div className="flex justify-center gap-8 py-[13px]">
          <Button variant="chatroom" onClick={() => handleOptionClick('고민없어')}>
            고민없어
          </Button>
          <Button variant="chatroom" onClick={() => handleOptionClick('나의 고민은..')}>
            나의 고민은..
          </Button>
        </div>
      )}
      {!showInput && !showOptions && (
        <div className={twMerge('w-full', isMobile ? 'py-7' : 'py-[30px]')} />
      )}
      {showInput && (
        <div className="flex items-end w-full gap-2 p-2">
          <ChatInput
            value={message}
            onSend={handleSendMessage}
            onChange={e => setMessage(e.target.value)}
          />
          <Button variant="sendButton" onClick={handleSendMessage}>
            <ArrowUp size={isMobile ? 18 : 20} />
          </Button>
        </div>
      )}
      {showAnimation && <TarotAnimation />}
    </div>
  );
};

export default TarotChatroom;
