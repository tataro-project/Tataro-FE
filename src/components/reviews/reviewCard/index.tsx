import Image from 'next/image';
import { Eye } from 'lucide-react';

import useScreenWidth from '@/hooks/useScreenWidth';
import useLayerCardStore from '@/stores/layerCardStore';

import { layerCard } from '@common/layerCard';

import TheFool from '@images/TheFool.svg';

import ReviewDetail from '../reviewDetail';

import { ReviewCardProps } from '../types';

const ReviewCard: React.FC<ReviewCardProps> = ({
  id,
  title,
  content,
  user_nickname,
  created_at,
  updated_at,
  view_count,
}) => {
  const { hideLayerCard } = useLayerCardStore();
  const { isCustomWidth } = useScreenWidth(640);

  const showLayerCard = () => {
    layerCard({
      content: <ReviewDetail review_id={id} close={() => hideLayerCard()} />,
      size: 'max-w-5xl max-h-[768px]',
    });
  };

  return (
    <li className="w-full">
      <button
        onClick={showLayerCard}
        className={`flex items-center w-full max-h-32 border border-purple bg-lightPink hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 hover:cursor-pointer ${isCustomWidth ? 'gap-4 px-4 py-3' : 'gap-5 px-6 py-4 '}`}
        aria-label={`${title} 리뷰 상세보기`}
      >
        <Image
          src={TheFool}
          alt="타로카드"
          width={50}
          className={`${isCustomWidth ? 'hidden' : 'block'}`}
        />
        <div className="flex flex-col justify-center w-full h-full text-purple">
          <div
            className={`flex items-center w-full ${isCustomWidth ? 'justify-between' : 'gap-5'}`}
          >
            <h2 className={`font-gBold truncate ${isCustomWidth ? 'text-sm' : 'text-base'}`}>
              {title}
            </h2>
            <p className="text-xs line-clamp-1">{user_nickname}</p>
          </div>
          <p
            className={`w-full min-h-10 text-left line-clamp-2 break-all ${isCustomWidth ? 'text-xs' : 'text-sm'}`}
          >
            {content}
          </p>
          <div className="flex justify-between items-center w-full text-xs">
            <time
              dateTime={
                updated_at || created_at
                  ? new Date(updated_at || created_at).toISOString()
                  : undefined
              }
            >
              {updated_at
                ? new Date(updated_at).toLocaleDateString()
                : new Date(created_at).toLocaleDateString()}
            </time>
            <p className="flex items-center gap-1">
              <Eye className="w-4" />
              {view_count}
            </p>
          </div>
        </div>
      </button>
    </li>
  );
};

export default ReviewCard;
