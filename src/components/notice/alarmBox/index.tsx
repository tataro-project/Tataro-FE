'use client';

import { X } from 'lucide-react';

import useLayerCardStore from '@/stores/layerCardStore';

const AlarmBox = () => {
  const { hideLayerCard } = useLayerCardStore();

  return (
    <div>
      <h1 className="absolute top-1 left-[106px] font-lilita text-lightBlue text-3xl stroke">
        alarm
      </h1>
      <button onClick={hideLayerCard} className="absolute top-1 right-1">
        <X strokeWidth={1.5} className="text-purple" />
      </button>

      <div className="font-gMedium text-sm">새로운 알림이 없습니다.</div>
    </div>
  );
};

export default AlarmBox;
