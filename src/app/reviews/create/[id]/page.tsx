'use client';

import ReviewForm from '@/components/reviews/reviewForm';

import ContentBox from '@common/contentBox';

const ReviewCreate = () => {
  return (
    <div className="flex justify-center items-center w-full h-full font-gMedium text-purple">
      <ContentBox size="max-w-3xl max-h-[800px]" layout="w-full h-full">
        <ReviewForm mode="create" />
      </ContentBox>
    </div>
  );
};

export default ReviewCreate;
