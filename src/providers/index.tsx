'use client';

import LayerCardProvider from './LayerCardProvider';
import LayerPopupProvider from './LayerPopupProvider';

import ProviderProps from './types';

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <LayerPopupProvider>
        <LayerCardProvider>{children}</LayerCardProvider>
      </LayerPopupProvider>
    </>
  );
};

export default Providers;
