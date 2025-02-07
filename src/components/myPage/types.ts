export type MyPageSubmenus = 'Profile' | 'Assessment' | 'Payment' | 'Chat History';

export type Submenus = {
  submenu: MyPageSubmenus;
  content: () => JSX.Element | null;
};
