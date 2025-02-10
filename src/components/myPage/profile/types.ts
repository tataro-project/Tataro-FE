import { z } from 'zod';
import { profileFormSchema, signUpFormSchema } from './schemas';
import { UseFormReturn } from 'react-hook-form';

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
