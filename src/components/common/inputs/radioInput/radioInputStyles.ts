import { cva } from 'class-variance-authority';

export const radioGroupStyles = cva('flex flex-col', {
  variants: {
    isMobile: {
      true: 'w-full sm:w-96',
      false: 'w-96',
    },
  },
});

export const radioItemStyles = cva(
  'flex items-center gap-2 relative text-purple font-gMedium text-xl cursor-pointer',
  {
    variants: {
      isMobile: {
        true: 'text-sm sm:text-xl',
        false: null,
      },
    },
  },
);

export const radioCheckboxStyles = cva(
  'flex justify-center items-center w-6 h-6 border border-purple rounded-sm bg-cream transition-all',
  {
    variants: {
      isMobile: {
        true: 'w-5 sm:w-6 h-5 sm:h-6',
        false: null,
      },
    },
  },
);
