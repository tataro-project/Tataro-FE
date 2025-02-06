import { cva } from 'class-variance-authority';

export const textInputStyles = cva(
  'text-purple font-gMedium text-xl w-96 bg-transparent border-purple border-b border-solid outline-none',
  {
    variants: {
      isMobile: {
        true: 'w-full flex-1 text-sm sm:w-96 sm:text-xl',
        false: null,
      },
    },
  },
);
