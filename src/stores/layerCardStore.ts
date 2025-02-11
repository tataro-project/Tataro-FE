import { create } from 'zustand';

import LayerCardType from '@common/layerCard/types';

type LayerCardState = {
  layerCardData: LayerCardType;
  showLayerCard: (layerCardData: LayerCardType) => void;
  hideLayerCard: () => void;
  isVisible: boolean;
};

const DEFAULT_LAYER_CARD_DATA: LayerCardType = {
  content: '',
  variant: undefined,
  position: undefined,
  size: '',
};

const useLayerCardStore = create<LayerCardState>(set => ({
  layerCardData: DEFAULT_LAYER_CARD_DATA,
  isVisible: false,
  showLayerCard: (layerCardData: LayerCardType) => set({ layerCardData, isVisible: true }),
  hideLayerCard: () => set({ layerCardData: DEFAULT_LAYER_CARD_DATA, isVisible: false }),
}));

export default useLayerCardStore;
