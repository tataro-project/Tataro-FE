'use client';

import useLayerCardStore from '@/stores/layerCardStore';
import LayerCardType from './types';
import ContentBox from '@common/contentBox';
import { useEffect } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    isVisible,
  } = useLayerCardStore();

  useEffect(() => {
    return () => hideLayerCard();
  }, [hideLayerCard]);

  return (
    <>
      {isVisible && (
        <div className="fixed top-0 left-0 z-30 w-screen h-screen px-4 bg-purple bg-opacity-10">
          <div className={twMerge(clsx('fixed w-full h-full px-2', position, size))}>
            <ContentBox variant={variant}>{content}</ContentBox>
          </div>
        </div>
      )}
    </>
  );
};

export default LayerCard;
