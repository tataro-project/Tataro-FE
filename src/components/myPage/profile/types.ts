import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { getUserResponseSchema, profileFormSchema, signUpFormSchema } from './schemas';

export type ProfileFormType = z.infer<typeof profileFormSchema>;

export type SignUpFormType = z.infer<typeof signUpFormSchema>;

export type FormType<T extends boolean> = T extends true ? ProfileFormType : SignUpFormType;

export type ProfileFormPresentationProps<T extends boolean> = {
  formMethods: Omit<
    UseFormReturn<T extends true ? ProfileFormType : SignUpFormType>,
    'handleSubmit'
  >;
  isEditMode: T;
};

export type ConsentItem = {
  item: keyof FormType<false>;
  label: string;
};

export type GetUserResponseSchema = z.infer<typeof getUserResponseSchema>;
