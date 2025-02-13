'use client';

import { X } from 'lucide-react';

import useOutsideClick from '@/hooks/useOutsideClick';
import useLayerCardStore from '@/stores/layerCardStore';

import AlarmBoxProps from './types';

const AlarmBox = ({ isOpen, close }: AlarmBoxProps) => {
  const ref = useOutsideClick(() => {
    if (isOpen) close();
  });
  const hideLayerCard = useLayerCardStore(state => state.hideLayerCard);

  return (
    <div ref={ref}>
      <h1 className="absolute top-1 left-[106px] font-lilita text-lightBlue text-3xl stroke">
        alarm
      </h1>
      <button tabIndex={isOpen ? 0 : -1} onClick={hideLayerCard} className="absolute top-1 right-1">
        <X strokeWidth={1.5} className="text-purple" />
      </button>

      <div className="font-gMedium text-sm">새로운 알림이 없습니다.</div>
    </div>
  );
};

export default AlarmBox;
