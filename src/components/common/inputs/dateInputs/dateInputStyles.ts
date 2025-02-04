import { cva } from 'class-variance-authority';

export const dateInputStyles = cva(
  'text-center text-purple font-gMedium text-xl bg-cream border-purple border-2 border-solid px-2  ',
  {
    variants: {
      isMobile: {
        true: 'text-sm w-full max-w-72 sm:w-fit py-1 px-6 sm:px-2 sm:py-0 sm:text-xl',
        false: null,
      },
    },
  },
);
