export type ReviewsSubmenus = 'Best' | 'New';

export type Submenus = {
  submenu: ReviewsSubmenus;
  content: () => JSX.Element | null;
};

export type Review = {
  id: number;
  title: string;
  chatlog_id: number;
  content: string;
  user_nickname: string;
  created_at: string;
  updated_at: string | null;
  img_url: string;
  view_count: number;
};

export type ReviewCardProps = Review;

export type ReviewDetailProps = {
  review_id: number;
  close: () => void;
};
