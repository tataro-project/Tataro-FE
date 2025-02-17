export type TarotInitResponse = {
  content: string;
  chat_id: number;
  room_id: string;
};

export type TarotCard = {
  question: string;
  content: string;
  card_name: string;
  card_url: string;
  card_content: string;
  card_direction: '정방향' | '역방향';
};

export type TarotConsultResponse = {
  room_id: string;
  chat_log: TarotCard[];
};
