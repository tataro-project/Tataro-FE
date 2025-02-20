import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useBeforeUnload } from '@/hooks/useBeforeUnload';
import useScreenWidth from '@/hooks/useScreenWidth';
import { useTarotQueries } from '@/hooks/useTarotQueries';
import { useTarotStore } from '@/stores/tarotStore';

import Button from '@common/button';
import ChatBubble from '@common/chatBubble';
import ChatInput from '@common/inputs/chatInput';

import TarotAnimation from '../tarotAnimation';

import { ChatBubbleProps } from '@common/chatBubble/types';
import { initialChatbotMessages } from '../constants';

const TarotChatroom = () => {
  const { isMobile } = useScreenWidth();

  const { initTarotMutation, consultTarotMutation } = useTarotQueries();
  const setRoomId = useTarotStore(state => state.setRoomId);
  const setTarotResult = useTarotStore(state => state.setTarotResult);

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatBubbleProps[]>([]);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isAnimationVisible] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useBeforeUnload();

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
        const updatedChatHistory = prev.map(msg => ({ ...msg, isButtonVisible: false }));
        return [...updatedChatHistory, { message, isChatbot: false, isButtonVisible: true }];
      });
      setMessage('');
    }
  };

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
      const updatedHistory = prev.map(msg => ({ ...msg, isButtonVisible: false }));
      return updatedHistory;
    });
    setIsInputVisible(false);

    initTarotMutation.mutate(userInput, {
      onSuccess: data => {
        console.log('타로 응답: ', data.content);
        console.log('룸 번호: ', data.room_id);
        setRoomId(data.room_id);
        setChatHistory(prev => [
          ...prev,
          { message: data.content || '고민을 생각하며 카드를 한장 뽑아봐', isChatbot: true },
        ]);
        console.log('Zustand 룸 저장: ', useTarotStore.getState().roomId);
        handleConsultTarot();

        // setTimeout(() => {
        //   setIsAnimationVisible(true);
        // }, 1000);
      },
      onError: error => {
        console.error('Error initializing tarot: ', error);
        setChatHistory(prev => [
          ...prev,
          { message: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.', isChatbot: true },
        ]);
      },
    });
  };

  const handleConsultTarot = () => {
    const { roomId } = useTarotStore.getState();

    if (!roomId) return;

    consultTarotMutation.mutate(roomId, {
      onSuccess: data => {
        console.log('타로 상담 결과: ', data.chat_log);
        const tarotCard = data.chat_log[data.chat_log.length - 1];
        setTarotResult(tarotCard);
        const newChatHistory = [
          {
            isChatbot: true,
            message: '해석 보기',
            tarotCard: {
              name: tarotCard.card_name,
              url: tarotCard.card_url,
              direction: tarotCard.card_direction,
            },
          },
        ];
        setChatHistory(prev => [...prev, ...newChatHistory]);
      },
      onError: error => {
        console.error('Error consulting tarot: ', error);
        setChatHistory(prev => [
          ...prev,
          { message: '죄송합니다. 타로 상담 중 오류가 발생했습니다.', isChatbot: true },
        ]);
      },
    });
  };

  // const handleReinitTarot = (content: string) => {
  //   if (!roomId) return;

  //   reinitTarotMutation.mutate(
  //     { roomId, content },
  //     {
  //       onSuccess: data => {
  //         setChatHistory(prev => [
  //           ...prev,
  //           { message: data.content || '새로운 고민에 대해 카드를 뽑아봐', isChatbot: true },
  //         ]);
  //         setTimeout(() => {
  //           setIsAnimationVisible(true);
  //         }, 1000);
  //       },
  //       onError: error => {
  //         console.error('Error reinitializing tarot: ', error);
  //         setChatHistory(prev => [
  //           ...prev,
  //           { message: '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.', isChatbot: true },
  //         ]);
  //       },
  //     },
  //   );
  // };

  return (
    <div className="flex flex-col justify-between gap-2 w-full h-full">
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-3 p-4 pb-2">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <ChatBubble {...chat} />
              {chat.isButtonVisible && (
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
