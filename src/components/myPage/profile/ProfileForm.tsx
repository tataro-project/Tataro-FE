import Button from '@common/button';
import DateInput from '@common/inputs/dateInputs';
import RadioInput from '@common/inputs/radioInput';
import TextInput from '@common/inputs/textInputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormType, ProfileFormProps } from './types';
import { profileFormSchema } from './schemas';

const DEFAULT_VALUES: ProfileFormType = {
  name: '하건아',
  nickname: 'matatarot',
  phone: '01012345678',
  birthday: '2025-02-06',
  gender: 'male',
};

const ProfileForm = ({ isEditMode = false }: ProfileFormProps) => {
  const formatPhoneNumber = (value: string | undefined) => {
    if (!value) return '';

    const onlyNumbers = value.replace(/\D/g, '');

    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7) return onlyNumbers.replace(/(\d{3})(\d{1,4})/, '$1-$2');

    return onlyNumbers.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: isEditMode ? DEFAULT_VALUES.name : undefined,
      nickname: isEditMode ? DEFAULT_VALUES.nickname : undefined,
      phone: isEditMode ? formatPhoneNumber(DEFAULT_VALUES.phone) : undefined,
      birthday: isEditMode ? DEFAULT_VALUES.birthday : undefined,
      gender: isEditMode ? DEFAULT_VALUES.gender : undefined,
    },
    mode: 'onSubmit',
  });
  const gender = watch('gender');
  const phone = watch('phone', undefined);

  const onSubmit: SubmitHandler<ProfileFormType> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center grow w-full">
      <div className="flex flex-col justify-center items-center gap-2 sm:gap-3 grow w-full">
        <TextInput {...register('name')} id="name" label="Name" error={errors.name?.message} />
        <TextInput
          {...register('nickname')}
          id="nickname"
          label="Nickname"
          error={errors.nickname?.message}
        />
        <TextInput
          {...register('phone')}
          value={formatPhoneNumber(phone)}
          onChange={async e => {
            const formattedNumber = formatPhoneNumber(e.target.value);
            setValue('phone', formattedNumber);

            await trigger('phone');
          }}
          id="phone"
          label="Mobile"
          type="tel"
          placeholder="010-0000-0000"
          className="placeholder-lightPink"
          error={errors.phone?.message}
        />
        <DateInput
          {...register('birthday')}
          id="birthday"
          label="Birthday"
          error={errors.birthday?.message}
        />
        <RadioInput
          {...register('gender', {
            onChange: async e => {
              if (e.target.value === 'male' || e.target.value === 'female') {
                setValue('gender', e.target.value);
              }
              await trigger('gender');
            },
          })}
          id="gender"
          label="Gender"
          options={[
            { value: 'male', label: '남성' },
            { value: 'female', label: '여성' },
          ]}
          value={gender}
          error={errors.gender?.message || ''}
          className="flex flex-col"
        />
      </div>
      <Button type="submit">{isEditMode ? '저장' : '가입하기'}</Button>
    </form>
  );
};

export default ProfileForm;
