import ChatBubbleProps from './types';

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isChatbot }) => {
  return (
    <div className={`flex ${isChatbot ? 'justify-start' : 'justify-end'} my-2`}>
      <div
        className={`max-w-xs px-4 py-2  rounded-2xl shadow-md text-base text-purple font-gMedium ${
          isChatbot ? 'bg-cream' : 'bg-lightBlue'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
