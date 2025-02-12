import { z } from 'zod';

import { getUserResponseSchema } from '@/components/myPage/profile/schemas';

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  created: z.boolean(),
  message: z.string(),
  user_id: z.number(),
  user_data: getUserResponseSchema,
});

export const socialLoginProviderSchema = z.enum(['kakao', 'naver']);
