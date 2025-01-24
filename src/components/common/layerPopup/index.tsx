'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideLayerPopup, showLayerPopup } from '@/store/slices/layerPopupSlice';
import { RootState, store } from '@/store/store';
import { LayerPopupType } from '@/components/common/layerPopup/types';
import { useEffect, useRef } from 'react';

let confirmHandler: (() => void) | null = null;

export const layerPopup = ({ type = 'info', content, onConfirmClick }: LayerPopupType) => {
  store.dispatch(showLayerPopup({ type, content }));
  if (onConfirmClick) confirmHandler = onConfirmClick;
};

const LayerPopup = () => {
  const dispatch = useAppDispatch();
  const {
    isVisible,
    layerPopup: { type, content },
  } = useAppSelector((state: RootState) => state.layerPopup);

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

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
      case 'Tab':
        e.preventDefault();

        if (type === 'confirm') {
          if (document.activeElement !== confirmButtonRef.current)
            confirmButtonRef.current?.focus();
          else cancelButtonRef.current?.focus();
        } else confirmButtonRef.current?.focus();

        break;
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';

      previousFocusRef.current = document.activeElement as HTMLElement;
      confirmButtonRef.current?.focus();

      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';

      previousFocusRef.current?.focus();

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
    <div className="flex justify-center items-center fixed top-0 left-0 z-50 w-screen h-screen bg-zinc-950 bg-opacity-20">
      <div
        className="flex flex-col items-center w-full max-w-md h-52 p-4 border border-zinc-900 rounded-2xl bg-zinc-50"
        role={type === 'alert' ? 'alertdialog' : 'dialog'}
        aria-modal={true}
        aria-describedby="popup-content"
      >
        <p id="popup-content" className="grow content-center">
          {content}
        </p>

        <div className="flex justify-center gap-3">
          {type === 'confirm' && (
            <>
              <button ref={cancelButtonRef} onClick={handleCancelClick}>
                취소
              </button>
              <button ref={confirmButtonRef} onClick={handleConfirmClick}>
                확인
              </button>
            </>
          )}

          {type !== 'confirm' && (
            <button ref={confirmButtonRef} onClick={handleConfirmClick}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LayerPopup;
