import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import useLayerCardStore from '@/stores/layerCardStore';

import LayerCard from '@common/layerCard';

import ProviderProps from './types';

const LayerCardProvider = ({ children }: ProviderProps) => {
  const { isVisible, hideLayerCard } = useLayerCardStore();
  const pathname = usePathname();

  useEffect(() => {
    hideLayerCard();
  }, [pathname, hideLayerCard]);

  return (
    <>
      {isVisible && <LayerCard />}
      {children}
    </>
  );
};

export default LayerCardProvider;
