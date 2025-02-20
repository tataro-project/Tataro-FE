import { useMutation } from '@tanstack/react-query';

import { consultTarot, initTarot, reinitTarot } from '@/api/tarotApi';
import { useTarotStore } from '@/stores/tarotStore';
import { TarotConsultResponse, TarotInitResponse } from '@/types/tarot';

export const useTarotQueries = () => {
  const { setRoomId } = useTarotStore();

  const initTarotMutation = useMutation<TarotInitResponse, Error, string>({
    mutationFn: initTarot,
    onSuccess: data => {
      setRoomId(data.room_id);
    },
    onError: error => {
      console.error('Error initializing tarot: ', error);
    },
  });

  const reinitTarotMutation = useMutation<
    TarotInitResponse,
    Error,
    { roomId: string; content: string }
  >({
    mutationFn: ({ roomId, content }) => reinitTarot(roomId, content),
    onSuccess: data => {
      setRoomId(data.room_id);
    },
  });

  const consultTarotMutation = useMutation<TarotConsultResponse, Error, string>({
    mutationFn: (roomId: string) => consultTarot(roomId),
  });

  return {
    initTarotMutation,
    reinitTarotMutation,
    consultTarotMutation,
  };
};
