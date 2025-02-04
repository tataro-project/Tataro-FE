import useIsMobile from '@/hooks/useIsMobile';
import Button from '@common/button';
import DateInput from '@common/inputs/dateInputs';
import RadioInput from '@common/inputs/radioInput';
import TextInput from '@common/inputs/textInputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface ProfileFormData {
  name: string;
  nickname: string;
  phone: string;
  birthday: string;
  gender: string;
}

const Profile = () => {
  const { isMobileDevice } = useIsMobile();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>();
  const gender = watch('gender');

  if (isMobileDevice === null) return null;

  const onSubmit: SubmitHandler<ProfileFormData> = data => {
    console.log(data);
  };

  return (
    <div
      className={twMerge(
        'flex flex-col w-full h-full items-center justify-evenly px-6',
        isMobileDevice ? '' : '',
      )}
    >
      <h1
        className={twMerge(
          'font-lilita text-cream stroke',
          isMobileDevice ? 'text-3xl' : 'text-4xl',
        )}
      >
        PROFILE
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 w-full items-center justify-center"
      >
        <div className="flex flex-col gap-2 sm:gap-6 w-full items-center justify-center">
          <TextInput
            id="name"
            label="NAME"
            {...register('name', {
              required: '이름을 입력해주세요',
            })}
            error={errors.name?.message}
          />
          <TextInput
            id="nickname"
            label="NICKNAME"
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
            })}
            error={errors.nickname?.message}
          />
          <TextInput
            id="phone"
            label="PHONE"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^(010|011|016|017|018|019)\d{8}$/,
                message: '올바른 전화번호를 입력해주세요',
              },
            })}
            error={errors.phone?.message}
          />
          <DateInput
            id="birthday"
            label="BIRTHDAY"
            max={new Date().toISOString().split('T')[0]}
            error={errors.birthday?.message}
          />
          <RadioInput
            id="gender"
            label="GENDER"
            options={[
              { value: 'male', label: '남성' },
              { value: 'female', label: '여성' },
            ]}
            value={gender}
            onChange={e => {
              setValue('gender', e.target.value);
            }}
          />
        </div>
        <Button type="submit">저장</Button>
      </form>
    </div>
  );
};

export default Profile;
