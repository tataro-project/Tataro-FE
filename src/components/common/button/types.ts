import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | 'primary'
    | 'simple'
    | 'startButton'
    | 'menuButton'
    | 'submenuButton'
    | 'priceTag'
    | 'chatroom'
    | 'sendButton'
    | 'editAndDeleteButton';
  isSelected?: boolean;
  isReviewed?: boolean;
};

export default ButtonProps;
