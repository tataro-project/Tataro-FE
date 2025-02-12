import { z } from 'zod';

import { loginResponseSchema, socialLoginProviderSchema } from './schemas';

export type LoginResponseType = z.infer<typeof loginResponseSchema>;

export type SocialLoginProviderType = z.infer<typeof socialLoginProviderSchema>;
