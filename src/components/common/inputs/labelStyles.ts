import { cva } from 'class-variance-authority';

export const labelStyles = cva('text-cream font-lilita text-2xl stroke', {
  variants: {
    isMobile: {
      true: 'text-lg sm:text-2xl ',
      false: null,
    },
  },
});
