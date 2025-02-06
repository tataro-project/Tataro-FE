import Button from '@common/button';
import { PriceTab, PriceTabs } from '@common/tabs/priceTabs';
import { Heart } from 'lucide-react';
import HeartChargeHistory from './heartChargeHistory';
import HeartUsageHistory from './heartUsageHistory';
import { useState } from 'react';
import ContentBox from '@common/contentBox';
import ChargeOptions from './chargeOptions';
import useOutsideClick from '@/hooks/useOutsideClick';
import { createPortal } from 'react-dom';

const REMAINING_HEARTS = 150;

const Payment = () => {
  const [showLayerCard, setShowLayerCard] = useState<boolean>(false);

  const ref = useOutsideClick(() => setShowLayerCard(false));

  const main = document.querySelector('main') as HTMLElement;

  return (
    <section className="flex flex-col justify-between items-center gap-4 sm:gap-6 w-full h-full">
      <h3 className="font-lilita text-4xl text-cream stroke">Payment</h3>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 w-full max-w-lg px-6 py-2 border border-purple rounded-full bg-lightPink">
        <div className="flex items-center gap-5 font-gMedium text-sm sm:text-base">
          <Heart strokeWidth={1} size={28} className="shrink-0 fill-deepPink text-purple" />
          <span>보유 중인 하트</span>
          <p className="flex items-center gap-2">
            <span className="font-gBold text-lg sm:text-2xl text-deepPink stroke">
              {REMAINING_HEARTS}
            </span>
            <span>개</span>
          </p>
        </div>
        <Button variant="simple" className="sm:text-lg" onClick={() => setShowLayerCard(true)}>
          충전하기
        </Button>
      </div>

      <PriceTabs>
        <PriceTab label="결제내역">
          <HeartChargeHistory />
        </PriceTab>
        <PriceTab label="사용내역">
          <HeartUsageHistory />
        </PriceTab>
      </PriceTabs>

      {showLayerCard &&
        createPortal(
          <div className="fixed top-1/2 left-1/2 z-30 w-full h-full max-w-2xl max-h-[576px] px-2 -translate-x-1/2 -translate-y-1/2">
            <ContentBox variant="price" ref={ref}>
              <ChargeOptions close={() => setShowLayerCard(false)} />
            </ContentBox>
          </div>,
          main,
        )}
    </section>
  );
};

export default Payment;
