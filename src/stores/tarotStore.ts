import { create } from 'zustand';

import { TarotCard } from '@/types/tarot';

type TarotState = {
  roomId: string | null;
  setRoomId: (id: string) => void;
  resetRoomId: () => void;
  tarotResult: TarotCard | null;
  setTarotResult: (result: TarotCard) => void;
};

export const useTarotStore = create<TarotState>(set => ({
  roomId: null,
  setRoomId: id => set({ roomId: id }),
  resetRoomId: () => set({ roomId: null }),
  tarotResult: null,
  setTarotResult: result => set({ tarotResult: result }),
}));
