'use client';

import { useParams } from 'next/navigation';

import ReviewForm from '@/components/reviews/reviewForm';
import { useReviewStore } from '@/stores/reviewStore';

import ContentBox from '@common/contentBox';

const ReviewEdit = () => {
  const params = useParams();
  const reviewId = params.reviewId as string;
  const currentReview = useReviewStore(state => state.currentReview);
  const initialData = currentReview
    ? {
        title: currentReview.title,
        content: currentReview.content,
      }
    : null;

  return (
    <div className="flex justify-center items-center w-full h-full font-gMedium text-purple">
      <ContentBox size="max-w-3xl max-h-[800px]" layout="w-full h-full">
        <ReviewForm mode="edit" initialData={initialData} reviewId={reviewId} />
      </ContentBox>
    </div>
  );
};

export default ReviewEdit;
