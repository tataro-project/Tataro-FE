'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ReviewForm from '@/components/reviews/reviewForm';

import ContentBox from '@common/contentBox';

const ReviewEdit = () => {
  const searchParams = useSearchParams();
  const [initialData, setInitialData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const title = searchParams.get('title');
    const content = searchParams.get('content');

    if (title && content) {
      setInitialData({
        title: decodeURIComponent(title),
        content: decodeURIComponent(content),
      });
    }
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center w-full h-full font-gMedium text-purple">
      <ContentBox size="max-w-3xl max-h-[800px]" layout="w-full h-full">
        <ReviewForm mode="edit" initialData={initialData || undefined} />
      </ContentBox>
    </div>
  );
};

export default ReviewEdit;
