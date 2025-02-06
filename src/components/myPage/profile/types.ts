import { z } from 'zod';
import { profileFormSchema } from './schemas';

export type ProfileFormType = z.infer<typeof profileFormSchema>;

export type ProfileFormProps = {
  isEditMode?: boolean;
};
