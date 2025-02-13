import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';
import { X } from 'lucide-react';

import useScreenWidth from '@/hooks/useScreenWidth';
import useLayerCardStore from '@/stores/layerCardStore';

import HeartPriceTag from './HeartPriceTag';

import { NUMBER_OF_HEARTS_FOR_SALE } from '../constants';

const ChargeOptions = () => {
  const { isInit, isCustomWidth } = useScreenWidth(640);
  const { hideLayerCard } = useLayerCardStore();

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideLayerCard();
      }
    };

    document.addEventListener('keydown', handleClose);

    return () => document.removeEventListener('keydown', handleClose);
  }, [hideLayerCard]);

  if (!isInit) return null;

  return (
    <FocusTrap active={true} focusTrapOptions={{ initialFocus: false }}>
      <div className="flex flex-col justify-between items-center gap-6 relative w-full h-full p-6">
        <h3 className="font-lilita text-4xl text-purple">Heart Packages</h3>
        <X
          strokeWidth={1.5}
          size={28}
          className="absolute top-2 right-2 text-purple cursor-pointer"
          onClick={() => hideLayerCard()}
          tabIndex={0}
        />
        {!isCustomWidth && (
          <div className="flex justify-evenly w-full bg-purple">
            <div>
              {NUMBER_OF_HEARTS_FOR_SALE.slice(0, 5).map(heart => (
                <HeartPriceTag key={`${heart}개 ${heart * 100}원`} heart={heart} />
              ))}
            </div>
            <div>
              {NUMBER_OF_HEARTS_FOR_SALE.slice(5).map(heart => (
                <HeartPriceTag key={`${heart}개 ${heart * 100}원`} heart={heart} />
              ))}
            </div>
          </div>
        )}

        {isCustomWidth && (
          <div className="flex flex-col items-center w-full bg-purple overflow-y-scroll scrollbar-hide">
            {NUMBER_OF_HEARTS_FOR_SALE.map(heart => (
              <HeartPriceTag key={`${heart}개 ${heart * 100}원`} heart={heart} />
            ))}
          </div>
        )}
      </div>
    </FocusTrap>
  );
};

export default ChargeOptions;
