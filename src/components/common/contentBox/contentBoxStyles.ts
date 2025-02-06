import { cva } from 'class-variance-authority';

export const contentBoxShadowStyles = cva('relative top-1 left-1 z-10 w-full h-full border', {
  variants: {
    variant: {
      default: 'bg-deepPink border-purple',
      price: 'bg-purple border-purple',
      layerCard: 'bg-lightYellow border-blueGray',
      layerPopup: 'bg-deepBlue border-blueGray',
    },
  },
});

export const contentBoxBaseStyles = cva(
  'flex flex-col justify-center items-center absolute bottom-2 right-2 -z-10 w-full h-full border',
  {
    variants: {
      variant: {
        default: 'bg-softPink border-purple',
        price: 'bg-cream border-purple',
        layerCard: 'bg-cream border-blueGray',
        layerPopup: 'bg-lightBlue border-blueGray',
      },
    },
  },
);
