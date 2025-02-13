'use client';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import useOutsideClick from '@/hooks/useOutsideClick';
import useLayerCardStore from '@/stores/layerCardStore';

import ContentBox from '@common/contentBox';

import LayerCardType from './types';

export const layerCard = ({
  content,
  variant = 'layerCard',
  position = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  size,
}: LayerCardType) => {
  const store = useLayerCardStore.getState();
  store.showLayerCard({ content, variant, position, size });
};

const LayerCard = () => {
  const {
    layerCardData: { content, variant, position, size },
    hideLayerCard,
  } = useLayerCardStore();

  const ref = useOutsideClick(() => hideLayerCard());

  return (
    <div className="fixed top-0 left-0 z-40 w-screen h-screen px-4 bg-purple bg-opacity-10">
      <div className={twMerge(clsx('fixed w-full h-full p-2', position, size))}>
        <ContentBox variant={variant} ref={ref}>
          {content}
        </ContentBox>
      </div>
    </div>
  );
};

export default LayerCard;
