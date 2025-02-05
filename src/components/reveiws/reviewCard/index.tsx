import Image from 'next/image';
import ReviewCardProps from './types';
import TheFool from '@images/TheFool.svg';
import { Eye } from 'lucide-react';

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  content,
  nickname,
  createdAt,
  updatedAt,
  viewCount,
}) => {
  return (
    <div className="flex items-center gap-10 w-full h-32 px-6 py-4 border border-purple bg-lightPink">
      <Image src={TheFool} alt="타로카드" width={50} />
      <div className="flex-1 flex-col justify-center h-full text-purple">
        <div className="flex items-center gap-5">
          <h2 className="text-base font-gBold">{title}</h2>
          <p className="text-xs">{nickname}</p>
        </div>
        <div className="px-2">
          <p className="text-sm">{content.substring(0, 82)}...</p>
          <div className="flex justify-between items-center text-xs">
            <p>{updatedAt ? updatedAt : createdAt}</p>
            <p className="flex items-center gap-1">
              <Eye className="w-4" />
              {viewCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
