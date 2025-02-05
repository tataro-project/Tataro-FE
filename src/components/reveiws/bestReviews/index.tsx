import Pagination from '@common/pagination';
import { useEffect, useMemo, useState } from 'react';
import { mockReviews } from '../mockReviews';
import ReviewCard from '../reviewCard';

const BestReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  const sortedReviews = useMemo(() => {
    return [...mockReviews].sort((a, b) => b.view_count - a.view_count);
  }, []);

  const currentReviews = useMemo(() => {
    return sortedReviews.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [sortedReviews, currentPage, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    //API 호출
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full px-16">
      <h1 className="text-4xl font-lilita text-cream stroke">Best Review</h1>
      <div className="flex flex-col justify-start items-center gap-4 w-full min-h-[416px]">
        {currentReviews.map(review => (
          <ReviewCard
            key={review.id}
            title={review.title}
            content={review.content}
            nickname={review.nickname}
            createdAt={review.created_at}
            updatedAt={review.updated_at}
            imgUrl={review.img_url}
            viewCount={review.view_count}
          />
        ))}
      </div>
      <Pagination
        totalResults={mockReviews.length}
        currentPage={currentPage}
        setPage={handlePageChange}
        perPage={perPage}
      />
    </div>
  );
};

export default BestReviews;
