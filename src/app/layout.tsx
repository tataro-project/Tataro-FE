import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from '@/components/providers/Providers';
import LayerPopup from '@/components/common/layerPopup/LayerPopup';

export const metadata: Metadata = {
  title: '하쿠나마타타로',
  description: '타로카드로 당신의 연애운을 읽어보세요.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Providers>
          <main>{children}</main>
          <LayerPopup />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
