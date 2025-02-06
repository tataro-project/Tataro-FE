import Button from '@common/button';
import DateInput from '@common/inputs/dateInputs';
import RadioInput from '@common/inputs/radioInput';
import TextInput from '@common/inputs/textInputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormType, ProfileFormProps, SignUpFormType } from './types';
import { profileFormSchema, signUpFormSchema } from './schemas';
import CheckboxInput from '@common/inputs/checkboxInput';
import { CONSENT_ITEMS } from '../constants';
import { useState } from 'react';

const DEFAULT_VALUES_PROFILE_FORM: ProfileFormType = {
  name: '하건아',
  nickname: 'matatarot',
  phone: '01012345678',
  birthday: '2025-02-06',
  gender: 'male',
};

const DEFAULT_VALUES_SIGNUP_FORM: SignUpFormType = {
  name: '',
  nickname: '',
  phone: '',
  birthday: '',
  gender: undefined,
  requiredTerms: false,
  requiredPrivacy: false,
  optionalPrivacy: false,
  optionalMarketing: false,
};

const ProfileForm = ({ isEditMode = false }: ProfileFormProps) => {
  type FormType = typeof isEditMode extends true ? ProfileFormType : SignUpFormType;
  const formSchema = isEditMode ? profileFormSchema : signUpFormSchema;
  const defaultValues = isEditMode ? DEFAULT_VALUES_PROFILE_FORM : DEFAULT_VALUES_SIGNUP_FORM;

  const [consent, setConsent] = useState(false);

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
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const gender = watch('gender');
  const phone = watch('phone', undefined);

  const onSubmit: SubmitHandler<FormType> = data => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4 grow w-full pb-2 overflow-y-auto"
    >
      <div className="flex flex-col justify-center gap-6 grow w-full overflow-y-auto">
        <div className="flex flex-col items-start gap-2 w-full overflow-y-auto">
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

          {!isEditMode && (
            <div className="flex flex-col gap-3 w-full px-2 py-4 mt-4 border-t border-purple">
              <CheckboxInput
                label="모두 동의"
                value={consent}
                onChange={() => {
                  CONSENT_ITEMS.forEach(({ item }) => setValue(item, !consent));
                  setConsent(!consent);
                }}
                error={errors.requiredTerms?.message || errors.requiredPrivacy?.message || ''}
              />
              <div className="flex flex-col gap-2 pl-4">
                {CONSENT_ITEMS.map(({ item, label }) => {
                  const checked = watch(item);

                  return (
                    <CheckboxInput
                      {...register(item, {
                        onChange: async e => {
                          console.log(e.target.checked);
                          setValue(item, e.target.checked);
                          setConsent(false);
                        },
                      })}
                      value={checked}
                      key={label}
                      label={label}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button type="submit">{isEditMode ? '저장' : '가입하기'}</Button>
    </form>
  );
};

export default ProfileForm;
