import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FocusTrap } from 'focus-trap-react';
import { X } from 'lucide-react';

import useOutsideClick from '@/hooks/useOutsideClick';
import useScreenWidth from '@/hooks/useScreenWidth';

import Button from '@common/button';

import { ReviewDetailProps } from '../types';

const ReviewDetail: React.FC<ReviewDetailProps> = ({
  id,
  title,
  content,
  nickname,
  img_url,
  created_at,
  updated_at,
  view_count,
  close,
}) => {
  const router = useRouter();
  const { isCustomWidth } = useScreenWidth(640);
  const ref = useOutsideClick(close);

  const handleEdit = () => {
    const queryParams = new URLSearchParams({
      title: encodeURIComponent(title),
      content: encodeURIComponent(content),
    }).toString();

    router.push(`/reviews/edit/${id}?${queryParams}`);
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
          <p className="font-gMedium">조회수: {view_count}회</p>
        </header>

        <div className={`flex items-center justify-between ${isCustomWidth ? 'px-4' : 'px-8'}`}>
          <p>{nickname}</p>
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
        </div>

        <section className="flexf flex-1 flex-col justify-between gap-4 overflow-y-auto scrollbar-hide">
          <Image src={img_url} alt="타로카드" width={120} className="m-auto" />
          <div className={`flex-1 ${isCustomWidth ? 'max-h-60' : 'max-h-64'} py-8`}>{content}</div>
        </section>

        <footer className="flex justify-end items-center gap-4">
          <Button variant="editAndDeleteButton" aria-label="수정" onClick={handleEdit}>
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
