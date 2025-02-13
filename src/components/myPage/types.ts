import { ReactNode } from 'react';

export type MyPageSubmenus = 'Profile' | 'Payment' | 'Chat History';

export type Submenus = {
  submenu: MyPageSubmenus;
  content: () => ReactNode;
};
