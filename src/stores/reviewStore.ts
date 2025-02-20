import { create } from 'zustand';

import { Review } from '@/components/reviews/types';

type ReviewStoreState = {
  currentReview: Review | null;
  setCurrentReview: (review: Review) => void;
};

export const useReviewStore = create<ReviewStoreState>(set => ({
  currentReview: null,
  setCurrentReview: (review: Review) => set({ currentReview: review }),
}));
