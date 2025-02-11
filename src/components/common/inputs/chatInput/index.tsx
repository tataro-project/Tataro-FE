import React, { useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import useScreenWidth from '@/hooks/useScreenWidth';

import ChatInputProps from './types';

const ChatInput: React.FC<ChatInputProps> = ({ value = '', onChange, onSend, className }) => {
  const { isMobile } = useScreenWidth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const MAX_HEIGHT = 80;

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.max(isMobile ? 40 : 44, Math.min(scrollHeight, MAX_HEIGHT));
      textareaRef.current.style.height = `${newHeight}px`;
      textareaRef.current.style.overflowY = scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
    }
  }, [isMobile]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      if (isComposing) return;
      e.preventDefault();
      if (value.trim()) {
        onSend();
        if (textareaRef.current) {
          textareaRef.current.style.height = isMobile ? '40px' : '44px';
        }
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    if (textareaRef.current) {
      textareaRef.current.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value, isMobile, adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      className={twMerge(
        'w-full resize-none overflow-hidden rounded-3xl border border-blueGray bg-lightBlue px-4 py-2 scrollbar-hide focus:outline-blueGray',
        isMobile ? 'min-h-10 text-sm' : 'min-h-11 text-base',
        className,
      )}
      rows={1}
    />
  );
};

export default ChatInput;
