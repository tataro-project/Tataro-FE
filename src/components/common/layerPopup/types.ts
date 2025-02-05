export type LayerPopupType = {
  type?: 'info' | 'confirm' | 'alert';
  content: string[];
  onConfirmClick?: () => void;
};
