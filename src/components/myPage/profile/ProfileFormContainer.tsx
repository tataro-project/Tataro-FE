import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import useUserActions from '@/hooks/useUserActions';
import useUserStore from '@/stores/userStore';

import Button from '@common/button';

import ProfileFormPresentation from './ProfileFormPresentation';
import { profileFormSchema, signUpFormSchema } from './schemas';

import { FormType } from './types';
import { DEFAULT_VALUES_SIGNUP_FORM } from './constants';

const ProfileFormContainer = () => {
  const pathname = usePathname();
  const isEditMode = pathname === '/mypage';

  const { user } = useUserStore.getState();
  const { editProfile } = useUserActions();

  const formSchema = isEditMode ? profileFormSchema : signUpFormSchema;
  const defaultValues =
    isEditMode && user
      ? { nickname: user.nickname, birthday: user.birthday, gender: user.gender }
      : DEFAULT_VALUES_SIGNUP_FORM;

  const methods = useForm<FormType<typeof isEditMode>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormType<typeof isEditMode>> = data => {
    editProfile({ ...data, birthday: new Date(data.birthday).toISOString() });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4 grow w-full pb-2 overflow-y-auto"
      >
        <ProfileFormPresentation isEditMode={isEditMode} />
        <Button type="submit">{isEditMode ? '저장' : '가입하기'}</Button>
      </form>
    </FormProvider>
  );
};

export default ProfileFormContainer;
