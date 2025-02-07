import { ReactNode } from 'react';

type LayerCardType = {
  content: ReactNode;
  variant?: 'layerCard' | 'price';
  position?: string;
  size: string;
};

export default LayerCardType;
