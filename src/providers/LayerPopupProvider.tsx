import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import useLayerPopupStore from '@/stores/layerPopupStore';

import LayerPopup from '@common/layerPopup';

import ProviderProps from './types';

const LayerPopupProvider = ({ children }: ProviderProps) => {
  const { isVisible, hideLayerPopup } = useLayerPopupStore();
  const pathname = usePathname();

  useEffect(() => {
    hideLayerPopup();
  }, [pathname, hideLayerPopup]);

  return (
    <>
      {isVisible && <LayerPopup />}
      {children}
    </>
  );
};

export default LayerPopupProvider;
