import { Heart } from 'lucide-react';

import Button from '@common/button';
import { layerCard } from '@common/layerCard';
import { PriceTab, PriceTabs } from '@common/tabs/priceTabs';

import ChargeOptions from './chargeOptions';
import HeartChargeHistory from './heartChargeHistory';
import HeartUsageHistory from './heartUsageHistory';

const REMAINING_HEARTS = 150;

const Payment = () => {
  const showLayerPopup = () => {
    layerCard({
      content: <ChargeOptions />,
      variant: 'price',
      size: 'max-w-2xl h-[576px]',
    });
  };

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
        <Button variant="simple" className="sm:text-lg" onClick={showLayerPopup}>
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
    </section>
  );
};

export default Payment;
