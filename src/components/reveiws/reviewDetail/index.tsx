import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';
import Button from '@common/button';
import { ReviewDetailProps } from '../types';
import useScreenWidth from '@/hooks/useScreenWidth';
import useOutsideClick from '@/hooks/useOutsideClick';

const ReviewDetail: React.FC<ReviewDetailProps> = ({
  title,
  content,
  nickname,
  imgUrl,
  createdAt,
  updatedAt,
  viewCount,
  close,
}) => {
  const { isCustomWidth } = useScreenWidth(640);
  const ref = useOutsideClick(close);

  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [close]);

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
          <h3 className={`${isCustomWidth ? 'text-xl' : 'text-3xl'}`}>{title}</h3>
          <p className="font-gMedium">조회수: {viewCount}회</p>
        </header>

        <div className={`flex items-center justify-between ${isCustomWidth ? 'px-4' : 'px-8'}`}>
          <p>{nickname}</p>
          <time
            dateTime={
              updatedAt || createdAt ? new Date(updatedAt || createdAt).toISOString() : undefined
            }
          >
            {updatedAt
              ? new Date(updatedAt).toLocaleDateString()
              : new Date(createdAt).toLocaleDateString()}
          </time>
        </div>

        <section className="flexf flex-1 flex-col justify-between gap-4 overflow-y-auto scrollbar-hide">
          <Image src={imgUrl} alt="타로카드" width={120} className="m-auto" />
          <div className={`flex-1 ${isCustomWidth ? 'max-h-60' : 'max-h-64'} py-8`}>{content}</div>
        </section>

        <footer className="flex justify-end items-center gap-4">
          <Button variant="editAndDeleteButton" aria-label="수정">
            수정
          </Button>
          <Button variant="editAndDeleteButton" aria-label="삭제">
            삭제
          </Button>
        </footer>
      </article>
    </FocusTrap>
  );
};

export default ReviewDetail;
