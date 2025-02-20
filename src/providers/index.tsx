'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import LayerCardProvider from './LayerCardProvider';
import LayerPopupProvider from './LayerPopupProvider';
import TokenRefreshProvider from './TokenRefreshProvider';

import ProviderProps from './types';

const queryClient = new QueryClient();

const Providers = ({ children }: ProviderProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TokenRefreshProvider>
          <LayerPopupProvider>
            <LayerCardProvider>{children}</LayerCardProvider>
          </LayerPopupProvider>
        </TokenRefreshProvider>
      </QueryClientProvider>
    </>
  );
};

export default Providers;
