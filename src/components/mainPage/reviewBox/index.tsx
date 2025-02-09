'use client';
import Image from 'next/image';
import TheFool from '@images/TheFool.svg';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';
import ContentBox from '@common/contentBox';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ReviewCardProps } from '@/components/reveiws/reviewCard/types';
import ReviewDetail from '@/components/reveiws/reviewDetail';

const ReviewBox: React.FC<ReviewCardProps> = ({
  title,
  content,
  nickname,
  createdAt,
  updatedAt,
  viewCount,
}) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [mainEl, setMainEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const main = document.querySelector('main') as HTMLElement;
    setMainEl(main);
  }, []);

  const ref = useOutsideClick(() => setIsOpenDetail(false));

  return (
    <div>
      <button
        onClick={() => setIsOpenDetail(true)}
        className="flex flex-col items-center gap-12 w-[500px] h-[650px] px-6 py-4 border border-purple bg-lightPink hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 hover:cursor-pointer"
        aria-label={`${title} 리뷰 상세보기`}
      >
        <Image src={TheFool} alt="타로카드" width={160} className="mt-7" />
        <div className="flex flex-1 flex-col justify-center gap-10 h-full text-purple">
          <div className="flex justify-between">
            <h2 className="text-base font-gBold">{title}</h2>
            <p className="text-xs">{nickname}</p>
          </div>

          <p className="text-sm text-left line-clamp-2">{content}</p>
          <div className="flex justify-between items-center text-xs">
            <p>{updatedAt ? updatedAt : createdAt}</p>
            <p className="flex items-center gap-1">
              <Eye className="w-4" />
              {viewCount}
            </p>
          </div>
        </div>
      </button>
      {isOpenDetail &&
        mainEl &&
        createPortal(
          <div className="fixed z-20 w-full h-full max-w-[1000px] max-h-[750px] px-2">
            <ContentBox variant="layerCard" ref={ref}>
              <ReviewDetail
                title={title}
                content={content}
                nickname={nickname}
                imgUrl={TheFool}
                createdAt={createdAt}
                updatedAt={updatedAt}
                viewCount={viewCount}
                close={() => setIsOpenDetail(false)}
              />
            </ContentBox>
          </div>,
          mainEl,
        )}
    </div>
  );
};

export default ReviewBox;
