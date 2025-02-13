import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ArrowUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { initTarot } from '@/api/tarotApi';
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
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isAnimationVisible, setIsAnimationVisible] = useState(false);

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
      setIsOptionsVisible(true);
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

  // init api
  const initTarotMutation = useMutation({
    mutationFn: initTarot,
    onSuccess: data => {
      console.log('타로 응답: ', data.content);
      setChatHistory(prev => [
        ...prev,
        { message: data.content || '고민을 생각하며 카드를 한장 뽑아봐', isChatbot: true },
      ]);
      setTimeout(() => {
        setIsAnimationVisible(true);
      }, 1000);
    },
    onError: error => {
      console.error('Error initializing tarot: ', error);
      setChatHistory(prev => [
        ...prev,
        { message: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요', isChatbot: true },
      ]);
    },
  });

  const handleOptionClick = (option: string) => {
    if (option === '고민없어') {
      setChatHistory(prev => [...prev, { message: '고민없어', isChatbot: false }]);
      setIsOptionsVisible(false);
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          { message: '고민이 생기면 나를 찾아와', isChatbot: true },
        ]);
      }, 1000);
    } else {
      setChatHistory(prev => [...prev, { message: '나의 고민은...', isChatbot: false }]);
      setIsInputVisible(true);
      setIsOptionsVisible(false);
    }
  };

  const handleCompleteInput = () => {
    const userInput = chatHistory
      .filter(chat => !chat.isChatbot)
      .map(chat => chat.message)
      .slice(1)
      .join(' ');
    console.log('챗: ', userInput);

    setChatHistory(prev => {
      const updatedHistory = prev.map(msg => ({ ...msg, showButton: false }));
      return updatedHistory;
    });
    setIsInputVisible(false);

    initTarotMutation.mutate(userInput);
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
      {isOptionsVisible && (
        <div className="flex justify-center gap-8 py-[13px]">
          <Button variant="chatroom" onClick={() => handleOptionClick('고민없어')}>
            고민없어
          </Button>
          <Button variant="chatroom" onClick={() => handleOptionClick('나의 고민은..')}>
            나의 고민은..
          </Button>
        </div>
      )}
      {!isInputVisible && !isOptionsVisible && (
        <div className={twMerge('w-full', isMobile ? 'py-7' : 'py-[30px]')} />
      )}
      {isInputVisible && (
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
      {isAnimationVisible && <TarotAnimation />}
    </div>
  );
};

export default TarotChatroom;
