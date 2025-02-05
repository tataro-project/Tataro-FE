export type ReviewsSubmenus = 'Best' | 'New';

export type Submenus = {
  submenu: ReviewsSubmenus;
  content: () => JSX.Element | null;
};

export type ChargeOptionsProps = {
  close: () => void;
};
