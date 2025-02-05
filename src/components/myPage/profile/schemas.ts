import { z } from 'zod';

const profileSchema = z.object({
  name: z
    .string()
    .transform(value => (value.trim() === '' ? undefined : value))
    .optional()
    .superRefine((value, ctx) => {
      if (value && !/^[가-힣]{2,5}$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '이름은 2~5자의 한글만 입력 가능합니다.',
        });
      }
    }),

  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(15, '닉네임은 최대 15자까지 가능합니다.')
    .regex(/^[가-힣a-zA-Z0-9_-]+$/, '닉네임은 한글, 영문, 숫자, _ , - 만 입력 가능합니다.'),

  phone: z
    .string()
    .transform(value => value.replace(/\D/g, '') || undefined)
    .optional()
    .superRefine((value, ctx) => {
      if (!value) return;

      if (!/^010\d{8}$/.test(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '올바른 휴대폰 번호가 아닙니다.' });
      }
    }),

  birthday: z
    .string()
    .transform(value => value || undefined)
    .superRefine((value, ctx) => {
      if (!value) return;

      const date = new Date(value);
      const today = new Date();

      if (date >= today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '생년월일은 오늘보다 이전 날짜여야 합니다.',
        });
      }
    })
    .optional(),

  gender: z.enum(['male', 'female']).optional(),
});

export default profileSchema;
