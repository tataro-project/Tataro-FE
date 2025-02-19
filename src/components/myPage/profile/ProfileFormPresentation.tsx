import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import useScreenWidth from '@/hooks/useScreenWidth';

import CheckboxInput from '@common/inputs/checkboxInput';
import DateInput from '@common/inputs/dateInputs';
import RadioInput from '@common/inputs/radioInput';
import TextInput from '@common/inputs/textInputs';

import { ProfileFormPresentationProps, ProfileFormType, SignUpFormType } from './types';
import { CONSENT_ITEMS } from './constants';

const ProfileFormPresentation = ({ isEditMode }: ProfileFormPresentationProps) => {
  const { isInit } = useScreenWidth();
  const [consent, setConsent] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<typeof isEditMode extends true ? ProfileFormType : SignUpFormType>();

  const gender = watch('gender');

  if (!isInit) return <div className="grow"></div>;

  return (
    <div className="flex flex-col justify-center gap-6 w-full overflow-y-auto">
      <div className="flex flex-col items-start gap-4 w-full overflow-y-auto scrollbar-hide">
        <TextInput
          {...register('nickname')}
          id="nickname"
          label="Nickname"
          error={errors.nickname?.message}
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
          error={errors.gender?.message}
          className="flex flex-col"
        />

        {!isEditMode && (
          <div className="flex flex-col gap-3 w-full px-2 pt-4 mt-2 sm:mt-0 border-t border-purple">
            <CheckboxInput
              label="모두 동의"
              value={consent}
              onChange={() => {
                CONSENT_ITEMS.forEach(({ item }) => {
                  setValue(item, !consent);
                });
                setConsent(!consent);
              }}
              error={errors.requiredTerms?.message || errors.requiredPrivacy?.message}
            />
            <div className="flex flex-col gap-2 pl-4">
              {CONSENT_ITEMS.map(({ item, label }) => {
                const checked = Boolean(watch(item));

                return (
                  <CheckboxInput
                    {...register(item, {
                      onChange: async e => {
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
  );
};

export default ProfileFormPresentation;
