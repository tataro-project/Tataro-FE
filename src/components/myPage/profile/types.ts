import { z } from 'zod';
import { profileFormSchema, signUpFormSchema } from './schemas';

export type ProfileFormType = z.infer<typeof profileFormSchema>;

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export type ProfileFormProps = {
  isEditMode?: boolean;
};
