import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FocusTrap } from 'focus-trap-react';
import { X } from 'lucide-react';

import { getReviewDetail } from '@/api/reviewApi';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useReviewMutations } from '@/hooks/useReviewMutations';
import useScreenWidth from '@/hooks/useScreenWidth';
import { useReviewStore } from '@/stores/reviewStore';

import Button from '@common/button';
import { layerPopup } from '@common/layerPopup';

import TheFool from '@images/TheFool.svg';

import { Review, ReviewDetailProps } from '../types';

const ReviewDetail = ({ review_id, close }: ReviewDetailProps) => {
  const [review, setReview] = useState<Review | null>(null);
  const { isCustomWidth } = useScreenWidth(640);
  const { deleteReviewMutation } = useReviewMutations();
  const router = useRouter();
  const ref = useOutsideClick(close);

  const handleEditButtonClick = () => {
    useReviewStore.setState({ currentReview: review });
    router.push(`/reviews/edit/${review_id}`);
  };

  const handleDeleteButtonClick = () => {
    layerPopup({
      type: 'confirm',
      content: '리뷰를 삭제하시겠습니까?',
      onConfirmClick: () => {
        deleteReviewMutation.mutate(review_id);
        close();
      },
    });
  };

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [close]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReviewDetail(review_id);
        console.log(typeof review_id);
        setReview(data);
      } catch (error) {
        console.error('Failed to fetch review detail', error);
      }
    };
    fetchData();
  }, [review_id]);

  if (!review) return null;

  return (
    <FocusTrap active={true} focusTrapOptions={{ initialFocus: false }}>
      <article
        ref={ref}
        className={`flex flex-col relative w-full h-full p-8 font-gMedium ${isCustomWidth ? 'gap-4 text-sm' : 'gap-6 text-base'}`}
      >
        <button
          onClick={() => close()}
          aria-label="닫기"
          className="absolute top-2 right-2 text-purple cursor-pointer hover:bg-purple/10 transition-colors"
        >
          <X strokeWidth={1.5} size={28} />
        </button>
        <header
          className={`flex ${isCustomWidth ? 'flex-col gap-2 p-3' : 'flex-row p-8'} 
            items-center justify-between border-b border-purple`}
        >
          <h3 className={`${isCustomWidth ? 'text-xl' : 'text-3xl'}`}>{review.title}</h3>
          <p className="font-gMedium">조회수: {review.view_count}회</p>
        </header>

        <div className={`flex items-center justify-between ${isCustomWidth ? 'px-4' : 'px-8'}`}>
          <p>{review.user_nickname}</p>
          <time
            dateTime={
              review.updated_at || review.created_at
                ? new Date(review.updated_at || review.created_at).toISOString()
                : undefined
            }
          >
            {review.updated_at
              ? new Date(review.updated_at).toLocaleDateString()
              : new Date(review.created_at).toLocaleDateString()}
          </time>
        </div>

        <section className="flex flex-1 flex-col justify-between gap-4 overflow-y-auto scrollbar-hide">
          <Image src={TheFool} alt="타로카드" width={120} className="m-auto" />
          <div
            dangerouslySetInnerHTML={{ __html: review.content }}
            className={`flex-1 ${isCustomWidth ? 'max-h-60' : 'max-h-64'} py-8`}
          />
        </section>

        <footer className="flex justify-end items-center gap-4">
          <Button variant="editAndDeleteButton" aria-label="수정" onClick={handleEditButtonClick}>
            수정
          </Button>
          <Button variant="editAndDeleteButton" aria-label="삭제" onClick={handleDeleteButtonClick}>
            삭제
          </Button>
        </footer>
      </article>
    </FocusTrap>
  );
};

export default ReviewDetail;
