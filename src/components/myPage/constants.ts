import ChatHistory from './chatHistory';
import Payment from './payment';
import Profile from './profile';
import { Submenus } from './types';

const SUBMENUS: Submenus[] = [
  { submenu: 'Profile', content: Profile },
  { submenu: 'Payment', content: Payment },
  { submenu: 'Chat History', content: ChatHistory },
] as const;

export const NUMBER_OF_HEARTS_FOR_SALE = [10, 30, 50, 100, 200, 300, 400, 500, 700, 1000] as const;

export const CONSENT_ITEMS = [
  { item: 'requiredTerms', label: '[필수] 이용약관 동의' },
  { item: 'requiredPrivacy', label: '[필수] 개인정보 수집 및 이용 동의' },
  { item: 'optionalPrivacy', label: '[선택] 개인정보 수집 및 이용 동의' },
  { item: 'optionalMarketing', label: '[선택] 마케팅 정보 수신 동의' },
] as const;

export default SUBMENUS;
