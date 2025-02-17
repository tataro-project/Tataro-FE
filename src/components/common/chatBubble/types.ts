import React from 'react';

export type ChatBubbleProps = {
  message: string | React.ReactNode;
  isChatbot: boolean;
  isButtonVisible?: boolean;
  tarotCard?: {
    name: string;
    url: string;
    direction: '정방향' | '역방향';
  };
};
