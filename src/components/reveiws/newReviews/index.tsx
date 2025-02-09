import { useEffect, useMemo, useRef, useState } from 'react';
import { mockReviews } from '../mockReviews';
import ReviewCard from '../reviewCard';
import Pagination from '@common/pagination';
import useScreenWidth from '@/hooks/useScreenWidth';

const NewReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isCustomWidth } = useScreenWidth(640);

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
        New
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

export default NewReviews;
