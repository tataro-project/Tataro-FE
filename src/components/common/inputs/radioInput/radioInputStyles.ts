import { cva } from 'class-variance-authority';

export const radioGroupStyles = cva('flex gap-6', {
  variants: {
    isMobile: {
      true: 'w-full',
      false: 'w-96',
    },
  },
});

export const radioItemStyles = cva(
  'relative flex items-center gap-2 cursor-pointer text-purple font-gMedium text-xl',
  {
    variants: {
      isMobile: {
        true: 'text-sm',
        false: null,
      },
    },
  },
);

export const radioCheckboxStyles = cva(
  'w-6 h-6 border-2 border-purple rounded-sm transition-all bg-cream',
  {
    variants: {
      isMobile: {
        true: 'w-5 h-5',
        false: null,
      },
    },
  },
);
