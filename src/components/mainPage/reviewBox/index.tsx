'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Eye } from 'lucide-react';

// import ReviewDetail from '@/components/reviews/reviewDetail';
// import useOutsideClick from '@/hooks/useOutsideClick';
// import ContentBox from '@common/contentBox';
import TheFool from '@images/TheFool.svg';

import { ReviewCardProps } from '@/components/reviews/types';

const ReviewBox: React.FC<ReviewCardProps> = ({
  // id,
  // chatlog_id,
  title,
  content,
  user_nickname,
  created_at,
  updated_at,
  view_count,
}) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [mainEl, setMainEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const main = document.querySelector('main') as HTMLElement;
    setMainEl(main);
  }, []);

  // const ref = useOutsideClick(() => setIsOpenDetail(false));

  return (
    <div>
      <button
        onClick={() => setIsOpenDetail(true)}
        className="flex flex-col items-center gap-12 max-w-[500px] h-[650px] px-6 py-4 border border-purple bg-lightPink hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 hover:cursor-pointer"
        aria-label={`${title} 리뷰 상세보기`}
      >
        <Image src={TheFool} alt="타로카드" className="mt-7 w-[160px] " />
        <div className="flex flex-1 flex-col justify-center gap-10 h-full text-purple">
          <div className="flex justify-between">
            <h2 className="text-base font-gBold">{title}</h2>
            <p className="text-xs">{user_nickname}</p>
          </div>

          <p className="text-sm text-left line-clamp-2">{content}</p>
          <div className="flex justify-between items-center text-xs">
            <p>{updated_at ? updated_at : created_at}</p>
            <p className="flex items-center gap-1">
              <Eye className="w-4" />
              {view_count}
            </p>
          </div>
        </div>
      </button>
      {isOpenDetail &&
        mainEl &&
        createPortal(
          <div className="fixed z-40 h-full w-full max-w-[1000px] max-h-[750px] p-2">
            {/* <ContentBox variant="layerCard" ref={ref}>
              <ReviewDetail
                id={id}
                chatlog_id={chatlog_id}
                title={title}
                content={content}
                user_nickname={user_nickname}
                img_url={TheFool}
                created_at={created_at}
                updated_at={updated_at}
                view_count={view_count}
                close={() => setIsOpenDetail(false)}
              />
            </ContentBox> */}
          </div>,
          mainEl,
        )}
    </div>
  );
};

export default ReviewBox;
