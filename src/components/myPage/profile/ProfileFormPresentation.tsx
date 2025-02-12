import { useState } from 'react';
import { FieldErrors, Path, PathValue } from 'react-hook-form';

import useScreenWidth from '@/hooks/useScreenWidth';

import CheckboxInput from '@common/inputs/checkboxInput';
import DateInput from '@common/inputs/dateInputs';
import RadioInput from '@common/inputs/radioInput';
import TextInput from '@common/inputs/textInputs';

import { FormType, ProfileFormPresentationProps, SignUpFormType } from './types';
import { CONSENT_ITEMS } from './constants';

const ProfileFormPresentation = <T extends boolean>({
  formMethods: {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  },
  isEditMode,
}: ProfileFormPresentationProps<T>) => {
  const { isInit } = useScreenWidth();
  const [consent, setConsent] = useState(false);

  const gender = watch('gender' as Path<FormType<T>>) as 'male' | 'female';

  if (!isInit) return <div className="grow"></div>;

  return (
    <div className="flex flex-col justify-center gap-6 grow w-full overflow-y-auto">
      <div className="flex flex-col items-start gap-2 w-full overflow-y-auto scrollbar-hide">
        <TextInput
          {...register('nickname' as Path<FormType<T>>)}
          id="nickname"
          label="Nickname"
          error={errors.nickname?.message as string}
        />
        <DateInput
          {...register('birthday' as Path<FormType<T>>)}
          id="birthday"
          label="Birthday"
          error={errors.birthday?.message as string}
        />
        <RadioInput
          {...register('gender' as Path<FormType<T>>, {
            onChange: async e => {
              if (e.target.value === 'male' || e.target.value === 'female') {
                setValue('gender' as Path<FormType<T>>, e.target.value);
              }
              await trigger('gender' as Path<FormType<T>>);
            },
          })}
          id="gender"
          label="Gender"
          options={[
            { value: 'male', label: '남성' },
            { value: 'female', label: '여성' },
          ]}
          value={gender}
          error={(errors.gender?.message as string) || ''}
          className="flex flex-col"
        />

        {!isEditMode && (
          <div className="flex flex-col gap-3 w-full px-2 pt-4 mt-2 sm:mt-0 border-t border-purple">
            <CheckboxInput
              label="모두 동의"
              value={consent}
              onChange={() => {
                CONSENT_ITEMS.forEach(({ item }) => {
                  setValue(
                    item as Path<FormType<T>>,
                    !consent as PathValue<FormType<T>, Path<FormType<T>>>,
                  );
                });
                setConsent(!consent);
              }}
              error={
                (errors as FieldErrors<SignUpFormType>).requiredTerms?.message ||
                (errors as FieldErrors<SignUpFormType>).requiredPrivacy?.message ||
                ''
              }
            />
            <div className="flex flex-col gap-2 pl-4">
              {CONSENT_ITEMS.map(({ item, label }) => {
                const checked = watch(item as Path<FormType<T>>);

                return (
                  <CheckboxInput
                    {...register(item as Path<FormType<T>>, {
                      onChange: async e => {
                        setValue(item as Path<FormType<T>>, e.target.checked);
                        setConsent(false);
                      },
                    })}
                    value={checked as boolean}
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
  );
};

export default ProfileFormPresentation;
