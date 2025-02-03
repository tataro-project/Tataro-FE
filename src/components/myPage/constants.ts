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

export default SUBMENUS;
