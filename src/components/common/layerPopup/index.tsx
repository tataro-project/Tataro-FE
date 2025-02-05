'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideLayerPopup, showLayerPopup } from '@/store/slices/layerPopupSlice';
import { RootState, store } from '@/store/store';
import { LayerPopupType } from '@/components/common/layerPopup/types';
import React, { useEffect } from 'react';
import Button from '@common/button';
import { FocusTrap } from 'focus-trap-react';
import ContentBox from '@common/contentBox';
import { twMerge } from 'tailwind-merge';

let confirmHandler: (() => void) | null = null;

export const layerPopup = ({ type = 'info', content, onConfirmClick }: LayerPopupType) => {
  store.dispatch(showLayerPopup({ type, content }));
  if (onConfirmClick) confirmHandler = onConfirmClick;
};

const BUTTON_STYLE = 'h-9 md:h-10 font-gMedium !text-purple stroke-none';

const LayerPopup = () => {
  const dispatch = useAppDispatch();
  const {
    isVisible,
    layerPopup: { type, content },
  } = useAppSelector((state: RootState) => state.layerPopup);

  const handleConfirmClick = () => {
    if (confirmHandler) {
      confirmHandler();
      confirmHandler = null;
    }
    dispatch(hideLayerPopup());
  };

  const handleCancelClick = () => {
    dispatch(hideLayerPopup());
    confirmHandler = null;
  };

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (!isVisible) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        handleCancelClick();
        break;

      case 'Enter':
        if (type !== 'confirm') {
          e.preventDefault();
          e.stopPropagation();
          handleConfirmClick();
        }
        break;
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <FocusTrap active={isVisible} focusTrapOptions={{ initialFocus: false }}>
      <div className="flex justify-center items-center fixed top-0 left-0 z-50 w-screen h-screen px-4 bg-purple bg-opacity-10">
        <ContentBox
          variant="layerPopup"
          size="max-w-md h-48 md:h-52"
          layout="p-5"
          role={type === 'alert' ? 'alertdialog' : 'dialog'}
          aria-modal={true}
          aria-describedby="popup-content"
        >
          <p
            id="popup-content"
            className="flex flex-col gap-1 grow self-start font-gMedium text-sm md:text-base text-purple"
          >
            {content.map(line => (
              <span key={line}>{line}</span>
            ))}
          </p>

          <div className="flex justify-center gap-3 self-end">
            {type === 'confirm' && (
              <Button
                variant="simple"
                onClick={handleCancelClick}
                className={twMerge(BUTTON_STYLE, 'bg-gray-300')}
              >
                취소
              </Button>
            )}
            <Button
              variant="simple"
              onClick={handleConfirmClick}
              className={twMerge(BUTTON_STYLE, 'bg-softBlue')}
            >
              확인
            </Button>
          </div>
        </ContentBox>
      </div>
    </FocusTrap>
  );
};

export default LayerPopup;
