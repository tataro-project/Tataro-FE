import { cva } from 'class-variance-authority';

export const textInputStyles = cva(
  'text-center text-purple font-gMedium text-xl w-96 bg-transparent border-purple border-b-2 border-solid',
  {
    variants: {
      isMobile: {
        true: 'w-full flex-1 text-sm',
        false: null,
      },
    },
  },
);
