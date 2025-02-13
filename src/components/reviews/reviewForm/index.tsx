import { useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import useScreenWidth from '@/hooks/useScreenWidth';

import Button from '@common/button';
import { layerPopup } from '@common/layerPopup';

import TextEditor from '../textEditor';
import { ReviewFormData, reviewFormSchema } from './schema';

type ReviewFormProps = {
  mode?: 'create' | 'edit';
  initialData?: {
    title: string;
    content: string;
  };
};

const ReviewForm = ({ mode = 'create', initialData }: ReviewFormProps) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const chatLogId = params.id as string;
  const { isInit, isCustomWidth } = useScreenWidth(640);

  const initialTitle = initialData?.title || searchParams.get('title') || '';
  const initialContent = initialData?.content || searchParams.get('content') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: decodeURIComponent(initialTitle),
      content: decodeURIComponent(initialContent),
    },
    mode: 'onSubmit',
  });

  if (!isInit) return null;

  const onSubmit = (data: ReviewFormData) => {
    layerPopup({
      type: 'confirm',
      content: mode === 'create' ? '리뷰를 등록하시겠습니까?' : '리뷰를 수정하시겠습니까?',
      onConfirmClick: () => {
        console.log('Form Data:', {
          id: chatLogId,
          ...data,
        });
      },
    });
  };

  const onError = () => {
    if (errors.title) {
      layerPopup({
        type: 'alert',
        content: errors.title.message,
      });
    } else if (errors.content) {
      layerPopup({
        type: 'alert',
        content: errors.content.message,
      });
    }
  };

  const handleEditorChange = (html: string) => {
    setValue('content', html);
  };

  return (
    <div
      className={`flex flex-col items-center w-full h-full ${isCustomWidth ? 'gap-4 p-5' : 'gap-8 p-10'}`}
    >
      <h1 className={`font-lilita text-cream stroke ${isCustomWidth ? 'text-3xl' : 'text-4xl'}`}>
        Review
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={`flex flex-1 flex-col items-center w-full min-h-0  ${isCustomWidth ? 'gap-4' : 'gap-8'}`}
      >
        <div className={`flex items-center w-full ${isCustomWidth ? 'flex-col gap-1' : 'gap-6'}`}>
          <p className={`font-gBold ${isCustomWidth ? 'w-full text-base' : 'text-lg'}`}>제목</p>
          <input
            {...register('title')}
            className={`flex px-3 border border-purple bg-cream ${isCustomWidth ? 'w-full h-8 text-sm' : 'flex-1 h-10'}`}
          />
        </div>
        <div className="flex-1 min-h-0 w-full">
          <TextEditor value={watch('content')} onChange={handleEditorChange} />
        </div>
        {mode === 'create' && <Button type="submit">등록</Button>}
        {mode === 'edit' && (
          <div className="flex gap-4">
            <Button type="submit">수정</Button>
            <Button type="button">삭제</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
