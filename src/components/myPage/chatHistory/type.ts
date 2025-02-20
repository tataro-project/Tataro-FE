import { TarotCard } from '@/types/tarot';

export type TarotChatlogs = {
  room_id: number;
  chat_log: TarotCard[];
  created_at: string;
  review_id: number | null;
};
