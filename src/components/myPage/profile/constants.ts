import { ConsentItem, ProfileFormType, SignUpFormType } from './types';

export const CONSENT_ITEMS: readonly ConsentItem[] = [
  { item: 'requiredTerms', label: '[필수] 이용약관 동의' },
  { item: 'requiredPrivacy', label: '[필수] 개인정보 수집 및 이용 동의' },
  { item: 'optionalPrivacy', label: '[선택] 개인정보 수집 및 이용 동의' },
  { item: 'optionalMarketing', label: '[선택] 마케팅 정보 수신 동의' },
] as const;

export const DEFAULT_VALUES_PROFILE_FORM: ProfileFormType = {
  name: '하건아',
  nickname: 'matatarot',
  phone: '01012345678',
  birthday: '2025-02-06',
  gender: 'male',
};

export const DEFAULT_VALUES_SIGNUP_FORM: SignUpFormType = {
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
