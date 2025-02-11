import { Heart } from 'lucide-react';

import Button from '@common/button';

import { HeartPriceTagProps } from '../types';

const HeartPriceTag = ({ heart }: HeartPriceTagProps) => {
  return (
    <div className="flex justify-center items-center px-4 py-6 border-b border-cream last:border-none">
      <div className="flex items-center gap-2 min-w-28">
        <Heart strokeWidth={1} size={28} className="fill-deepPink text-deepPink" />
        <span className="font-gMedium text-cream text-sm sm:text-base">{heart}개</span>
      </div>
      <Button variant="priceTag">{heart * 100}원</Button>
    </div>
  );
};

export default HeartPriceTag;
