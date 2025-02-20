import { useEffect, useRef, useState } from 'react';

import { paginatedReviewList } from '@/api/reviewApi';
import Pagination from '@/components/common/pagination';
import useScreenWidth from '@/hooks/useScreenWidth';

import ReviewCard from '../reviewCard';

import { Review } from '../types';

type ReviewListProps = {
  title: string;
  sortType: string;
};

const ReviewList = ({ title, sortType }: ReviewListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCustomWidth } = useScreenWidth(640);
  const perPage = 3;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    containerRef.current?.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await paginatedReviewList(sortType, currentPage, perPage);
        setReviews(data.results);
        setTotalReviews(data.total_count);
      } catch (error) {
        console.error('Failed to fetch tarotChatlogs', error);
      }
    };
    fetchData();
  }, [title, sortType, currentPage]);

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
          flex flex-col justify-start items-center w-full 
          ${isCustomWidth ? 'min-h-[350px] gap-3' : 'min-h-[410px] gap-6'}
        `}
      >
        {reviews.map(review => (
          <ReviewCard
            key={review.id}
            id={review.id}
            chatlog_id={review.chatlog_id}
            title={review.title}
            content={review.content}
            user_nickname={review.user_nickname}
            created_at={review.created_at}
            updated_at={review.updated_at}
            img_url={review.img_url}
            view_count={review.view_count}
          />
        ))}
      </ul>
      <Pagination
        totalResults={totalReviews}
        currentPage={currentPage}
        setPage={handlePageChange}
        perPage={perPage}
      />
    </div>
  );
};

export default ReviewList;
