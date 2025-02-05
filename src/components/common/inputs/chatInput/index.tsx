import useIsMobile from '@/hooks/useIsMobile';
import { twMerge } from 'tailwind-merge';
import React, { useEffect, useRef, useState } from 'react';
import ChatInputProps from './types';

const ChatInput: React.FC<ChatInputProps> = ({ value = '', onChange, onSend, className }) => {
  const { isMobile } = useIsMobile();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const MAX_HEIGHT = 80;

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, MAX_HEIGHT)}px`;
      textareaRef.current.style.overflowY = scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
    }
  };

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
          textareaRef.current.style.height = 'auto';
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
  }, [value]);

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
