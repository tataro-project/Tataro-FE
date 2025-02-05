import { useEffect, useMemo, useState } from 'react';
import { mockReviews } from '../mockReviews';
import ReviewCard from '../reviewCard';
import Pagination from '@common/pagination';

const NewReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  const sortedReviews = useMemo(() => {
    return [...mockReviews].sort((a, b) => {
      const dateA = new Date(a.updated_at || a.created_at).getTime();
      const dateB = new Date(b.updated_at || b.created_at).getTime();

      return dateB - dateA;
    });
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
    <div className="flex flex-col items-center gap-8 w-full px-16">
      <h1 className="text-4xl font-lilita text-cream stroke">New</h1>
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

export default NewReviews;
