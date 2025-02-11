import ChatHistory from './chatHistory';
import Payment from './payment';
import Profile from './profile';

import { Submenus } from './types';

const SUBMENUS: Submenus[] = [
  { submenu: 'Profile', content: Profile },
  { submenu: 'Payment', content: Payment },
  { submenu: 'Chat History', content: ChatHistory },
] as const;

export default SUBMENUS;
