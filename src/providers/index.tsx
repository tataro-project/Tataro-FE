'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LayerCardProvider from './LayerCardProvider';
import LayerPopupProvider from './LayerPopupProvider';

import ProviderProps from './types';

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LayerPopupProvider>
          <LayerCardProvider>{children}</LayerCardProvider>
        </LayerPopupProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
