'use client';

import ReviewEditor from '@/components/reviews/reviewEditor';
import ContentBox from '@common/contentBox';

const ReviewCreate = () => {
  return (
    <div className="flex justify-center items-center w-full h-full font-gMedium text-purple">
      <ContentBox size="max-w-3xl max-h-[800px]" layout="gap-8 w-full h-full p-10">
        <h1 className="text-4xl font-lilita text-cream stroke">Review</h1>
        <div className="flex items-center gap-6 w-full">
          <p className="text-lg font-gBold">제목</p>
          <input className="flex flex-1 h-10 px-3 border border-purple bg-cream" />
        </div>
        <ReviewEditor />
      </ContentBox>
    </div>
  );
};

export default ReviewCreate;
