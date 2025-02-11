import { create } from 'zustand';

import { LayerPopupType } from '@/components/common/layerPopup/types';

type LayerPopupState = {
  layerPopupData: LayerPopupType;
  showLayerPopup: (layerPopupData: LayerPopupType) => void;
  hideLayerPopup: () => void;
  isVisible: boolean;
};

const DEFAULT_LAYER_POPUP_DATA: LayerPopupType = {
  type: 'info',
  content: '',
  onConfirmClick: undefined,
};

const useLayerPopupStore = create<LayerPopupState>(set => ({
  layerPopupData: DEFAULT_LAYER_POPUP_DATA,
  isVisible: false,
  showLayerPopup: (layerPopupData: LayerPopupType) => set({ layerPopupData, isVisible: true }),
  hideLayerPopup: () => set({ layerPopupData: DEFAULT_LAYER_POPUP_DATA, isVisible: false }),
}));

export default useLayerPopupStore;
