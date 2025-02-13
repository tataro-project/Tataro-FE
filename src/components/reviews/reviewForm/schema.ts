import { z } from 'zod';

export const reviewFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.').max(50, '제목은 50자 이내로 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

export type ReviewFormData = z.infer<typeof reviewFormSchema>;
