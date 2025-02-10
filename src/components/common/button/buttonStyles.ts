import { cva } from 'class-variance-authority';

const HOVER_AND_ACTIVE_STYLE = 'hover:brightness-105 active:brightness-110';

const buttonStyles = cva(
  'shrink-0 border border-purple rounded-full transition-all ease-in-out duration-200',
  {
    variants: {
      variant: {
        primary:
          'h-9 md:h-10 px-4 bg-deepPink font-gBold text-base md:text-lg text-white md:text-cream hover:text-white active:translate-x-px active:translate-y-px active:drop-shadow-none stroke drop-shadow-px',
        simple: `h-8 md:h-9 px-4 bg-deepPink font-gBold text-sm md:text-base text-white md:text-cream stroke hover:text-white ${HOVER_AND_ACTIVE_STYLE}`,
        startButton:
          'w-44 md:w-72 h-10 md:h-14 bg-deepPink font-gBold text-base md:text-xl text-white md:text-cream stroke transition-all duration-500 hover:text-white hover:drop-shadow-2 hover:-translate-x-0.5 hover:-translate-y-0.5 active:drop-shadow-none active:translate-x-0 active:translate-y-0',
        menuButton: 'h-9 md:h-10 bg-deepPink font-lilita text-2xl md:text-3xl text-cream stroke',
        submenuButton: 'w-64 h-12 px-7 text-3xl text-start hover:rotate-1 font-lilita stroke',
        priceTag: `w-20 md:w-28 h-8 md:h-9 bg-cream font-gBold text-sm md:text-base text-purple ${HOVER_AND_ACTIVE_STYLE}`,
        chatroom: ` px-4 py-1 bg-lightPink font-gMedium text-sm md:text-base text-purple ${HOVER_AND_ACTIVE_STYLE}`,
        sendButton: `flex justify-center items-center size-10 md:size-11 border-blueGray bg-lightBlue ${HOVER_AND_ACTIVE_STYLE}`,
        editAndDeleteButton:
          'w-12 md:w-16 h-7 md:h-8 border-none bg-purple font-gMedium text-xs md:text-sm text-cream hover:text-white active:brightness-125',
      },
      isSelected: {
        true: null,
        false: null,
      },
      isReviewed: {
        true: null,
        false: null,
      },
      disabled: {
        true: 'pointer-events-none',
        false: null,
      },
    },
    compoundVariants: [
      { variant: 'simple', isReviewed: true, class: 'bg-softPink' },
      { variant: 'simple', isReviewed: false, class: 'bg-deepPink' },

      {
        variant: 'menuButton',
        disabled: true,
        class: 'w-fit px-6 bg-cream text-deepPink text-xl md:text-2xl',
      },
      {
        variant: 'menuButton',
        disabled: false,
        class: 'w-56 md:w-60 hover:brightness-105 active:bg-cream active:text-deepPink',
      },

      {
        variant: 'submenuButton',
        isSelected: true,
        class: 'bg-cream text-deepPink active:scale-105',
      },
      {
        variant: 'submenuButton',
        isSelected: false,
        class:
          'bg-deepPink text-cream hover:text-white active:bg-cream active:text-deepPink active:rotate-2',
      },
    ],
  },
);

export default buttonStyles;
