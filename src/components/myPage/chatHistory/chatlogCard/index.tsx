import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ReviewDetail from '@/components/reviews/reviewDetail';
import useScreenWidth from '@/hooks/useScreenWidth';
import useLayerCardStore from '@/stores/layerCardStore';

import Button from '@common/button';
import { layerCard } from '@common/layerCard';

import { TarotChatlogs } from '../type';

const ChatlogCard = ({ chat_log, room_id, created_at, review_id }: TarotChatlogs) => {
  const { hideLayerCard } = useLayerCardStore();
  const { isCustomWidth } = useScreenWidth(640);
  const router = useRouter();

  const handleReviewButtonClick = () => {
    if (review_id) {
      layerCard({
        content: <ReviewDetail review_id={review_id} close={() => hideLayerCard()} />,
        size: 'max-w-5xl max-h-[768px]',
      });
    } else {
      router.push(`/reviews/create/${room_id}`);
    }
  };
  return (
    <li className="w-full">
      <div
        tabIndex={0}
        className={`flex items-center w-full max-h-32 border border-purple bg-lightPink hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 hover:cursor-pointer ${isCustomWidth ? 'gap-4 px-4 py-3' : 'gap-5 px-6 py-4 '}`}
      >
        <div
          className={`relative flex items-center w-[82px] h-[94px] ${isCustomWidth ? 'hidden' : 'block'}`}
        >
          {chat_log.slice(0, 3).map((log, index) => (
            <Image
              key={index}
              src={log.card_url}
              alt={log.card_name}
              width={50}
              height={87}
              className={`absolute
                ${index === 0 ? 'left-0' : index === 1 ? 'left-4' : 'left-8'}`}
              style={{ zIndex: index, width: 'auto', height: '90%' }}
            />
          ))}
        </div>
        {isCustomWidth && (
          <div className="flex flex-col items-start gap-1 w-full text-purple">
            <div className="flex justify-between items-center w-full">
              <h2 className="font-gBold truncate text-sm">챗봇 상담</h2>
              <time className="text-xs" dateTime={created_at}>
                {new Date(created_at).toLocaleDateString()}
              </time>
            </div>
            <div className="flex flex-col items-start w-full min-h-8">
              <p className="text-left line-clamp-2 text-xs">{chat_log[0].question}</p>
            </div>
            <div className="flex items-center justify-end w-full">
              <Button
                variant="simple"
                isReviewed={review_id !== null}
                className="w-[85px] h-6 text-xs"
                onClick={handleReviewButtonClick}
              >
                {review_id ? '리뷰보기' : '리뷰작성'}
              </Button>
            </div>
          </div>
        )}

        {!isCustomWidth && (
          <>
            <div className="flex flex-1 flex-col items-start justify-center h-full text-purple">
              <h2 className="font-gBold truncate text-base">챗봇 상담</h2>
              <div className="flex flex-col items-start">
                <p className="text-left line-clamp-2 text-sm w-full min-h-10">
                  {chat_log[0].question}
                </p>
                <time className="text-sm" dateTime={created_at}>
                  {new Date(created_at).toLocaleDateString()}
                </time>
              </div>
            </div>
            <Button
              variant="simple"
              isReviewed={review_id !== null}
              onClick={handleReviewButtonClick}
            >
              {review_id ? '리뷰보기' : '리뷰작성'}
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default ChatlogCard;
