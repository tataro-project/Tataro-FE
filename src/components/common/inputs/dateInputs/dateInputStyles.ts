import { cva } from 'class-variance-authority';

export const dateInputStyles = cva(
  'text-center text-purple font-gMedium text-xl bg-cream border-purple border-2 border-solid',
  {
    variants: {
      isMobile: {
        true: 'flex-1 text-sm w-full',
        false: null,
      },
    },
  },
);
