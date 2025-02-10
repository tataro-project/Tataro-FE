import { ChatBubbleProps } from '@common/chatBubble/types';

export const initialChatbotMessages: ChatBubbleProps[] = [
  {
    message: '어서와~ 타타로를 만나러 와줘서 고마워',
    isChatbot: true,
  },
  {
    message: '어떤 고민이 있어서 왔니?',
    isChatbot: true,
  },
];

export const RADIUS = 500;
export const CARD_ANGLE = (2 * Math.PI) / 78;
export const TOTAL_CARDS = 78;
