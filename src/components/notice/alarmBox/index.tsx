'use client';

import useOutsideClick from '@/hooks/useOutsideClick';
import AlarmBoxProps from './types';

const AlarmBox = ({ isOpen, close }: AlarmBoxProps) => {
  const ref = useOutsideClick(() => {
    if (isOpen) close();
  });
  return (
    <div ref={ref}>
      <h1 className=" font-lilita text-lightBlue text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
        alarm
      </h1>

      <div className="font-gMedium text-sm">새로운 알림이 없습니다.</div>
    </div>
  );
};

export default AlarmBox;
