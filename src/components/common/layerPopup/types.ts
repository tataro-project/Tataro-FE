import { ReactNode } from 'react';

export type LayerPopupType = {
  type?: 'info' | 'confirm' | 'alert';
  content: ReactNode;
  onConfirmClick?: () => void;
};
