import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { createReview, deleteReview, updateReview } from '@/api/reviewApi';

import { layerPopup } from '@common/layerPopup';

export const useReviewMutations = () => {
  const router = useRouter();

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      layerPopup({
        type: 'alert',
        content: '리뷰가 성공적으로 등록되었습니다.',
      });
    },
    onError: () => {
      layerPopup({
        type: 'alert',
        content: '리뷰 등록에 실패했습니다',
      });
    },
  });
  const updateReviewMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      layerPopup({
        type: 'alert',
        content: '리뷰가 성공적으로 수정되었습니다.',
      });
    },
    onError: () => {
      layerPopup({
        type: 'alert',
        content: '리뷰 수정에 실패했습니다',
      });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      layerPopup({
        type: 'alert',
        content: '리뷰가 삭제되었습니다.',
      });
      router.push('/mypage');
    },
    onError: () => {
      layerPopup({
        type: 'alert',
        content: '리뷰 삭제에 실패했습니다.',
      });
    },
  });
  return {
    createReviewMutation,
    updateReviewMutation,
    deleteReviewMutation,
  };
};
