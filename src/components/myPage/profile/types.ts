import { z } from 'zod';

import { profileFormSchema, signUpFormSchema } from './schemas';

export type ProfileFormType = z.infer<typeof profileFormSchema>;

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export type FormType<T extends boolean> = T extends true ? ProfileFormType : SignUpFormType;

export type ProfileFormPresentationProps = {
  isEditMode: boolean;
};

export type ConsentItem = {
  item: keyof FormType<false>;
  label: string;
};
