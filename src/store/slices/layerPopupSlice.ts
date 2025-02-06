import { LayerPopupType } from '@/components/common/layerPopup/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type LayerPopupState = {
  layerPopup: Omit<LayerPopupType, 'onConfirmClick'>;
  isVisible: boolean;
};

const DEFAULT_LAYER_POPUP: Omit<LayerPopupType, 'onConfirmClick'> = {
  type: 'info',
  content: [],
} as const;

const initialState: LayerPopupState = {
  layerPopup: DEFAULT_LAYER_POPUP,
  isVisible: false,
};

const layerPopupSlice = createSlice({
  name: 'layerPopup',
  initialState,
  reducers: {
    showLayerPopup: (state, action: PayloadAction<LayerPopupType>) => {
      state.layerPopup = action.payload;
      state.isVisible = true;
    },
    hideLayerPopup: state => {
      state.layerPopup = DEFAULT_LAYER_POPUP;
      state.isVisible = false;
    },
  },
});

export const { showLayerPopup, hideLayerPopup } = layerPopupSlice.actions;
export default layerPopupSlice.reducer;
