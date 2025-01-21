export type LayerPopupType = {
  type?: 'info' | 'confirm' | 'alert';
  content: React.ReactNode;
  onConfirmClick?: () => void;
};
