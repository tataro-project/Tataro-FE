import { cva } from 'class-variance-authority';

export const dateInputStyles = cva(
  'px-2 border-purple border-2 border-solid bg-cream text-purple font-gMedium text-xl outline-none',
  {
    variants: {
      isMobile: {
        true: 'w-full max-w-72 sm:w-fit px-6 sm:px-2 py-1 sm:py-0 text-sm sm:text-xl',
        false: null,
      },
    },
  },
);
