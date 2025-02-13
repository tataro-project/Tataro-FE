import Image from 'next/image';
import Link from 'next/link';

import { mockReviews } from '@/components/reviews/mockData';
import ReviewDetail from '@/components/reviews/reviewDetail';
import useScreenWidth from '@/hooks/useScreenWidth';
import useLayerCardStore from '@/stores/layerCardStore';

import Button from '@common/button';
import { layerCard } from '@common/layerCard';

import TheFool from '@images/TheFool.svg';

import { Chatlog } from '../type';

const ChatlogCard = ({ id, content, created_at, isReviewed }: Chatlog) => {
  const { hideLayerCard } = useLayerCardStore();
  const { isCustomWidth } = useScreenWidth(640);
  const review = mockReviews.find(review => review.chatlog_id === id);

  const showLayerCard = () => {
    if (review) {
      layerCard({
        content: (
          <ReviewDetail
            id={review.id}
            chatlog_id={id}
            title={review.title}
            content={review.content}
            nickname={review.nickname}
            img_url={TheFool}
            created_at={review.created_at}
            updated_at={review.updated_at}
            view_count={review.view_count}
            close={() => hideLayerCard()}
          />
        ),
        size: 'max-w-5xl max-h-[768px]',
      });
    }
  };

  return (
    <li>
      <button
        className={`flex items-center justify-beetween w-full max-h-32 border border-purple bg-lightPink hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 hover:cursor-pointer ${isCustomWidth ? 'gap-4 px-4 py-3' : 'gap-10 px-6 py-4 '}`}
      >
        <Image
          src={TheFool}
          alt="타로카드"
          width={50}
          className={`${isCustomWidth ? 'hidden' : 'block'}`}
        />
        {isCustomWidth && (
          <div className="flex flex-col items-start gap-1 text-purple">
            <div className="flex justify-between items-center w-full">
              <h2 className="font-gBold truncate text-sm">챗봇 상담</h2>
              <time className="text-xs" dateTime={new Date(created_at).toISOString()}>
                {new Date(created_at).toLocaleDateString()}
              </time>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-left line-clamp-2 text-xs">{content}</p>
            </div>
            <div className="flex items-center justify-end w-full">
              {isReviewed ? (
                <Button
                  variant="simple"
                  isReviewed={true}
                  className="w-[85px] h-6 text-xs"
                  onClick={showLayerCard}
                >
                  리뷰보기
                </Button>
              ) : (
                <Link href={`/reviews/create/${id}`}>
                  <Button variant="simple" className="w-[85px] h-6 text-xs">
                    리뷰작성
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}

        {!isCustomWidth && (
          <>
            <div className="flex flex-1 flex-col items-start justify-center h-full text-purple">
              <h2 className="font-gBold truncate text-base">챗봇 상담</h2>
              <div className="flex flex-col items-start px-2">
                <p className="text-left line-clamp-2 text-sm">{content}</p>
                <time className="text-sm" dateTime={new Date(created_at).toISOString()}>
                  {new Date(created_at).toLocaleDateString()}
                </time>
              </div>
            </div>
            {isReviewed ? (
              <Button variant="simple" isReviewed={true} onClick={showLayerCard}>
                리뷰보기
              </Button>
            ) : (
              <Link href={`/reviews/create/${id}`}>
                <Button variant="simple">리뷰작성</Button>
              </Link>
            )}
          </>
        )}
      </button>
    </li>
  );
};

export default ChatlogCard;
