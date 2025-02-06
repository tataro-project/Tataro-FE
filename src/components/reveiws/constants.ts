import BestReviews from './bestReviews';
import NewReviews from './newReviews';
import { Submenus } from './types';

const SUBMENUS: Submenus[] = [
  { submenu: 'Best', content: BestReviews },
  { submenu: 'New', content: NewReviews },
] as const;

export default SUBMENUS;
