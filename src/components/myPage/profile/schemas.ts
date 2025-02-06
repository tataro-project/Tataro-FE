import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z
    .string()
    .transform(value => value.replace(/\s+/g, ''))
    .superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '이름을 입력해 주세요.',
        });
      }
      if (value && !/^[가-힣]{2,5}$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '이름은 2~5자의 한글만 입력 가능합니다.',
        });
      }
    }),

  nickname: z
    .string()
    .transform(value => value.replace(/\s+/g, ''))
    .refine(value => value.length >= 2, {
      message: '닉네임은 최소 2자 이상이어야 합니다.',
    })
    .refine(value => value.length <= 15, {
      message: '닉네임은 최대 15자까지 가능합니다.',
    })
    .refine(value => /^[가-힣a-zA-Z0-9_-]+$/.test(value), {
      message: '닉네임은 한글, 영문, 숫자, _ , - 만 입력 가능합니다.',
    }),

  phone: z
    .string()
    .transform(value => value.replace(/\D/g, ''))
    .superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '휴대폰 번호를 입력해 주세요.' });
        return;
      }

      if (!/^010\d{8}$/.test(value)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '올바른 휴대폰 번호가 아닙니다.' });
      }
    }),

  birthday: z.string().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: '생년월일을 입력해 주세요.' });
      return;
    }

    const date = new Date(value);
    const today = new Date();

    if (date >= today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '생년월일은 오늘보다 이전 날짜여야 합니다.',
      });
    }
  }),

  gender: z
    .enum(['male', 'female'], {
      required_error: '성별을 선택해 주세요.',
      invalid_type_error: '성별을 선택해 주세요.',
    })
    .optional(),
});

const consentSchema = z.object({
  requiredTerms: z
    .boolean({
      required_error: '필수 이용약관에 동의해 주세요.',
    })
    .refine(val => val === true, {
      message: '필수 이용약관에 동의해 주세요.',
    }),
  requiredPrivacy: z
    .boolean({
      required_error: '필수 개인정보 수집 및 이용에 동의해 주세요.',
    })
    .refine(val => val === true, {
      message: '필수 개인정보 수집 및 이용에 동의해 주세요.',
    }),
  optionalPrivacy: z.boolean(),
  optionalMarketing: z.boolean(),
});

export const signUpFormSchema = profileFormSchema.merge(consentSchema);
