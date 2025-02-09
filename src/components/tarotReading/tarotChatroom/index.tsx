import useScreenWidth from '@/hooks/useScreenWidth';
import Button from '@common/button';
import ChatBubble from '@common/chatBubble';
import ChatInput from '@common/inputs/chatInput';
import { ArrowUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { chatbotMessages } from '../constants';

const TarotChatroom = () => {
  const { isMobile } = useScreenWidth();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ message: string; isChatbot: boolean }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;

    chatbotMessages.forEach((chat, index) => {
      setTimeout(
        () => {
          setChatHistory(prev => [...prev, chat]);
        },
        500 + index * 1000,
      );
    });
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { message, isChatbot: false }]);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col justify-between gap-2 w-full h-full">
      <div className="flex-1 overflow-auto px-2">
        <div className="flex flex-col gap-3 px-2">
          {chatHistory.map((chat, index) => (
            <ChatBubble key={index} message={chat.message} isChatbot={chat.isChatbot} />
          ))}
        </div>
        <div ref={chatEndRef} />
      </div>
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
    </div>
  );
};

export default TarotChatroom;
