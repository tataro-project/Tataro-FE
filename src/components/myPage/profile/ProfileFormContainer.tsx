import Button from '@common/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormType } from './types';
import { profileFormSchema, signUpFormSchema } from './schemas';
import ProfileFormPresentation from './ProfileFormPresentation';
import { usePathname } from 'next/navigation';
import { DEFAULT_VALUES_PROFILE_FORM, DEFAULT_VALUES_SIGNUP_FORM } from './constants';
import formatPhoneNumber from '@/utils/formatPhoneNumber';

const ProfileFormContainer = () => {
  const pathname = usePathname();
  const isEditMode = pathname === '/mypage';

  const formSchema = isEditMode ? profileFormSchema : signUpFormSchema;
  const defaultValues = isEditMode
    ? {
        ...DEFAULT_VALUES_PROFILE_FORM,
        phone: formatPhoneNumber(DEFAULT_VALUES_PROFILE_FORM.phone),
      }
    : DEFAULT_VALUES_SIGNUP_FORM;

  const { handleSubmit, ...formMethods } = useForm<FormType<typeof isEditMode>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FormType<typeof isEditMode>> = data => {
    // api 요청
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4 grow w-full pb-2 overflow-y-auto"
    >
      <ProfileFormPresentation formMethods={formMethods} isEditMode={isEditMode} />
      <Button type="submit">{isEditMode ? '저장' : '가입하기'}</Button>
    </form>
  );
};

export default ProfileFormContainer;
