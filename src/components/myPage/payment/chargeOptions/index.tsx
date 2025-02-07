import { X } from 'lucide-react';
import { NUMBER_OF_HEARTS_FOR_SALE } from '../constants';
import HeartPriceTag from './HeartPriceTag';
import { ChargeOptionsProps } from '../types';
import useScreenWidth from '@/hooks/useScreenWidth';
import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';

const ChargeOptions = ({ close }: ChargeOptionsProps) => {
  const { isInit, isCustomWidth } = useScreenWidth(640);

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [close]);

  if (!isInit) return null;

  return (
    <FocusTrap active={true} focusTrapOptions={{ initialFocus: false }}>
      <div className="flex flex-col justify-between items-center gap-6 relative w-full h-full p-6">
        <h3 className="font-lilita text-4xl text-purple">Heart Packages</h3>
        <X
          strokeWidth={1.5}
          size={28}
          className="absolute top-2 right-2 text-purple cursor-pointer"
          onClick={() => close()}
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
          <div className="flex flex-col items-center w-full bg-purple scrollable overflow-y-scroll">
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
