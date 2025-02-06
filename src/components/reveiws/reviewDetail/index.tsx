import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { ReviewDetailProps } from '../reviewCard/types';
import { FocusTrap } from 'focus-trap-react';
import Button from '@common/button';

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
  useEffect(() => {
    const handleClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleClose);
    return () => document.removeEventListener('keydown', handleClose);
  }, [close]);

  const handleXClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    close();
  };

  return (
    <FocusTrap active={true} focusTrapOptions={{ initialFocus: false }}>
      <div className="flex flex-col relative w-full h-full p-8 font-gMedium">
        <button
          onClick={handleXClick}
          aria-label="닫기"
          className="absolute top-2 right-2 text-purple cursor-pointer hover:bg-purple/10 transition-colors"
        >
          <X strokeWidth={1.5} size={28} />
        </button>
        <div className="flex items-center justify-between border-b border-purple p-8">
          <h3 className="text-3xl">{title}</h3>
          <p className="font-gMedium">조회수: {viewCount}회</p>
        </div>
        <div className="flex items-center justify-between p-8">
          <p>{nickname}</p>
          <p>{updatedAt ? updatedAt : createdAt}</p>
        </div>
        <div className="flex justify-center">
          <Image src={imgUrl} alt="타로카드" width={120} />
        </div>
        <div className="flex-1 py-8">{content}</div>
        <div className="flex justify-end items-center gap-4">
          <Button variant="editAndDeleteButton" aria-label="수정">
            수정
          </Button>
          <Button variant="editAndDeleteButton" aria-label="삭제">
            삭제
          </Button>
        </div>
      </div>
    </FocusTrap>
  );
};

export default ReviewDetail;
