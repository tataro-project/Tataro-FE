import { cva } from 'class-variance-authority';

const HOVER_AND_ACTIVE_STYLE = 'hover:brightness-105 active:brightness-110';

const buttonStyles = cva(
  'shrink-0 border border-purple rounded-full transition-all ease-in-out duration-200',
  {
    variants: {
      variant: {
        primary: 'px-4 bg-deepPink font-gBold text-cream stroke drop-shadow-px',
        simple: 'px-4 bg-deepPink font-gBold text-cream stroke',
        startButton: 'bg-deepPink font-gBold text-cream stroke',
        menuButton: 'bg-deepPink font-lilita text-cream stroke',
        submenuButton: 'font-lilita stroke',
        priceTag: 'bg-cream font-gBold text-purple',
        chatroom: 'bg-lightPink font-gMedium text-purple',
        sendButton: 'flex justify-center items-center border-blueGray bg-lightBlue',
        editAndDeleteButton: 'border-none bg-purple font-gMedium text-cream',
      },
      isSelected: {
        true: null,
        false: null,
      },
      isReviewed: {
        true: null,
        false: null,
      },
      isMobile: {
        true: null,
        false: null,
      },
      disabled: {
        true: 'pointer-events-none',
        false: null,
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        isMobile: false,
        class:
          'h-9 hover:text-white active:translate-x-px active:translate-y-px active:drop-shadow-none',
      },
      { variant: 'primary', isMobile: true, class: 'h-8 text-white text-sm' },
      {
        variant: 'simple',
        isMobile: false,
        class: `h-9 hover:text-white ${HOVER_AND_ACTIVE_STYLE}`,
      },
      { variant: 'simple', isMobile: true, class: 'h-8 text-white text-sm' },
      {
        variant: 'startButton',
        isMobile: false,
        class:
          'w-72 h-14 text-xl transition-all duration-500 hover:text-white hover:drop-shadow-2 hover:-translate-x-0.5 hover:-translate-y-0.5 active:drop-shadow-none active:translate-x-0 active:translate-y-0',
      },
      { variant: 'startButton', isMobile: true, class: 'w-44 h-10 text-white text-base' },
      { variant: 'menuButton', isMobile: false, class: 'w-60 h-10 text-3xl' },
      { variant: 'menuButton', isMobile: true, class: 'w-56 h-9 text-2xl' },

      {
        variant: 'submenuButton',
        isMobile: false,
        class: 'w-64 h-12 px-7 text-3xl text-start hover:rotate-1',
      },
      {
        variant: 'priceTag',
        isMobile: false,
        class: `w-28 h-9 text-base ${HOVER_AND_ACTIVE_STYLE}`,
      },
      { variant: 'priceTag', isMobile: true, class: 'w-20 h-8 text-sm' },
      { variant: 'chatroom', isMobile: false, class: `px-4 h-9 text-sm ${HOVER_AND_ACTIVE_STYLE}` },
      { variant: 'chatroom', isMobile: true, class: 'px-3 h-7 text-xs' },
      { variant: 'sendButton', isMobile: false, class: `size-12 ${HOVER_AND_ACTIVE_STYLE}` },
      { variant: 'sendButton', isMobile: true, class: 'size-10' },
      {
        variant: 'editAndDeleteButton',
        isMobile: false,
        class: 'w-16 h-8 text-sm hover:text-white active:brightness-125',
      },
      { variant: 'editAndDeleteButton', isMobile: true, class: 'w-12 h-7 text-xs' },

      { variant: 'simple', isReviewed: true, class: 'bg-softPink' },
      { variant: 'simple', isReviewed: false, class: 'bg-deepPink' },

      { variant: 'menuButton', disabled: true, class: 'w-fit px-6 bg-cream text-deepPink' },
      { variant: 'menuButton', isMobile: false, disabled: true, class: 'text-2xl' },
      { variant: 'menuButton', isMobile: true, disabled: true, class: 'text-xl' },
      {
        variant: 'menuButton',
        disabled: false,
        class: 'hover:brightness-105 active:bg-cream active:text-deepPink',
      },

      { variant: 'submenuButton', isSelected: true, class: 'bg-cream text-deepPink' },
      { variant: 'submenuButton', isSelected: false, class: 'bg-deepPink text-cream' },
      { variant: 'submenuButton', isSelected: true, isMobile: false, class: 'active:scale-105' },
      {
        variant: 'submenuButton',
        isSelected: false,
        isMobile: false,
        class: 'hover:text-white active:bg-cream active:text-deepPink active:rotate-2',
      },
    ],
  },
);

export default buttonStyles;
