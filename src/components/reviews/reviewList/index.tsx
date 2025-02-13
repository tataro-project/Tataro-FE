import { useEffect, useMemo, useRef, useState } from 'react';

import Pagination from '@/components/common/pagination';
import useScreenWidth from '@/hooks/useScreenWidth';

import ReviewCard from '../reviewCard';

import { Review } from '../types';

type ReviewListProps = {
  title: string;
  reviews: Review[];
  sortFunction?: (a: Review, b: Review) => number;
};

const ReviewList: React.FC<ReviewListProps> = ({
  title,
  reviews,
  sortFunction = (a, b) => b.view_count - a.view_count,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCustomWidth } = useScreenWidth(640);
  const perPage = 3;

  const sortedReviews = useMemo(() => {
    return [...reviews].sort(sortFunction);
  }, [reviews, sortFunction]);

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
        {title}
      </h1>
      <ul
        className={`
          flex flex-col justify-start items-center  
          ${isCustomWidth ? 'min-h-[350px] gap-3' : 'min-h-[410px] gap-6'}
        `}
      >
        {currentReviews.map(review => (
          <ReviewCard
            key={review.id}
            id={review.id}
            chatlog_id={review.chatlog_id}
            title={review.title}
            content={review.content}
            nickname={review.nickname}
            created_at={review.created_at}
            updated_at={review.updated_at}
            img_url={review.img_url}
            view_count={review.view_count}
          />
        ))}
      </ul>
      <Pagination
        totalResults={reviews.length}
        currentPage={currentPage}
        setPage={handlePageChange}
        perPage={perPage}
      />
    </div>
  );
};

export default ReviewList;
