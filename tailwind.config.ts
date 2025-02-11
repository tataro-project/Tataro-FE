import scrollbarHide from 'tailwind-scrollbar-hide';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lightPink: '#FED2F5',
        softPink: '#F79DDB',
        deepPink: '#E95CB0',
        purple: '#53265F',
        lightBlue: '#D9E6F9',
        softBlue: '#B5CBF9',
        deepBlue: '#6F9AF9',
        blueGray: '#4E5F73',
        cream: '#F9E3DF',
        lightYellow: '#FFE599',
        kakao: '#FEE500',
        naver: '#03C75A',
        kakaoText: '#000000D9',
      },
      fontFamily: {
        lilita: ['Lilita One'],
        batang: ['Gowun Batang'],
        gBold: ['gmarketBold'],
        gMedium: ['gmarketMedium'],
        gLight: ['gmarketLight'],
      },
      backgroundImage: {
        texture: 'url(/images/texture.svg)',
        logo: 'url(/images/logo.svg)',
        theFool: 'url(/images/TheFool.svg)',
        empress: 'url(/images/Empress.svg)',
        magician: 'url(/images/Magician.svg)',
        cardBack: 'url(/images/CardBack.svg)',
      },
      dropShadow: {
        px: '1px 1px 0 #53265F',
        2: '2px 2px 0 #53265F',
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.stroke': {
          '-webkit-text-stroke': '1px #53265F',
          'text-stroke': '1px #53265F',
        },
        '.stroke-none': {
          '-webkit-text-stroke': '0px',
          'text-stroke': '0px',
        },
      });
    }),
    scrollbarHide,
  ],
};
export default config;
