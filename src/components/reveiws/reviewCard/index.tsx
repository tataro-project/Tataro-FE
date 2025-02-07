import Image from 'next/image';
import TheFool from '@images/TheFool.svg';
import { Eye } from 'lucide-react';
import ReviewDetail from '../reviewDetail';
import { ReviewCardProps } from './types';
import { layerCard } from '@common/layerCard';
import useLayerCardStore from '@/stores/layerCardStore';

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  content,
  nickname,
  createdAt,
  updatedAt,
  viewCount,
}) => {
  const { hideLayerCard } = useLayerCardStore();

  const showLayerCard = () => {
    layerCard({
      content: (
        <ReviewDetail
          title={title}
          content={content}
          nickname={nickname}
          imgUrl={TheFool}
          createdAt={createdAt}
          updatedAt={updatedAt}
          viewCount={viewCount}
          close={() => hideLayerCard()}
        />
      ),
      size: 'max-w-5xl max-h-[768px]',
    });
  };

  return (
    <li>
      <button
        onClick={showLayerCard}
        className="flex items-center gap-10 w-full h-32 px-6 py-4 border border-purple bg-lightPink hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 hover:cursor-pointer"
        aria-label={`${title} 리뷰 상세보기`}
      >
        <Image src={TheFool} alt="타로카드" width={50} />
        <div className="flex flex-1 flex-col justify-center h-full text-purple">
          <div className="flex items-center gap-5">
            <h2 className="text-base font-gBold">{title}</h2>
            <p className="text-xs">{nickname}</p>
          </div>
          <div className="px-2">
            <p className="text-sm text-left line-clamp-2">{content}</p>
            <div className="flex justify-between items-center text-xs">
              <p>{updatedAt ? updatedAt : createdAt}</p>
              <p className="flex items-center gap-1">
                <Eye className="w-4" />
                {viewCount}
              </p>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

export default ReviewCard;
