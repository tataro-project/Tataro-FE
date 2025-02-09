import Pagination from '@common/pagination';
import { useEffect, useMemo, useRef, useState } from 'react';
import { mockReviews } from '../mockReviews';
import ReviewCard from '../reviewCard';
import useScreenWidth from '@/hooks/useScreenWidth';

const BestReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCustomWidth } = useScreenWidth(640);
  const perPage = 3;

  const sortedReviews = useMemo(() => {
    return [...mockReviews].sort((a, b) => b.view_count - a.view_count);
  }, []);

  const currentReviews = useMemo(() => {
    return sortedReviews.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [sortedReviews, currentPage, perPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    containerRef.current?.focus();
  };

  useEffect(() => {
    //API 호출
  }, [currentPage]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col justify-around items-center w-full h-full focus:outline-none ${isCustomWidth ? '' : 'px-14'}`}
      tabIndex={-1}
    >
      <h1 className={`font-lilita text-cream stroke ${isCustomWidth ? 'text-3xl' : 'text-4xl'}`}>
        Best Review
      </h1>
      <ul
        className={`
          flex flex-col justify-between items-center
          ${isCustomWidth ? 'min-h-[350px]' : 'min-h-[410px]'}
        `}
      >
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
      </ul>
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
