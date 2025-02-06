export type BaseReviewProps = {
  title: string;
  content: string;
  nickname: string;
  createdAt: string;
  updatedAt: string | null;
  imgUrl: string;
  viewCount: number;
};

export type ReviewCardProps = BaseReviewProps;

export type ReviewDetailProps = BaseReviewProps & {
  close: () => void;
};
