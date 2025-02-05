import Button from '@common/button';
import DateInput from '@common/inputs/dateInputs';
import RadioInput from '@common/inputs/radioInput';
import TextInput from '@common/inputs/textInputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ProfileData from './types';
import profileSchema from './schemas';

const NICKNAME = 'tatarot';

const Profile = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: undefined,
      nickname: NICKNAME,
      phone: undefined,
      birthday: undefined,
      gender: undefined,
    },
    mode: 'onSubmit',
  });

  const gender = watch('gender');
  const phone = watch('phone', undefined);

  const formatPhoneNumber = (value: string | undefined) => {
    if (!value) return '';

    const onlyNumbers = value.replace(/\D/g, '');

    return onlyNumbers.length === 11
      ? onlyNumbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      : onlyNumbers;
  };

  const onSubmit: SubmitHandler<ProfileData> = data => {
    console.log(data);
  };

  return (
    <section className="flex flex-col justify-between items-center w-full h-full">
      <h3 className="font-lilita text-cream stroke text-3xl md:text-4xl">Profile</h3>
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
            onChange={e => setValue('phone', e.target.value.replace(/\D/g, ''))}
            id="phone"
            label="Phone"
            type="tel"
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
              onChange: e => {
                if (e.target.value === 'male' || e.target.value === 'female')
                  setValue('gender', e.target.value);
              },
            })}
            id="gender"
            label="Gender"
            options={[
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
            ]}
            value={gender}
          />
        </div>
        <Button type="submit" className="">
          저장
        </Button>
      </form>
    </section>
  );
};

export default Profile;
