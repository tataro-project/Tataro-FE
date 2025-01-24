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
        kakao: '#FEE500',
        naver: '#03C75A',
        kakaoText: '#000000D9',
      },
      fontFamily: {
        menu: ['Lilita One'],
        batang: ['Gowun Batang'],
      },
      backgroundImage: {
        texture: 'url(/images/texture.svg)',
        logo: 'url(/images/logo.svg)',
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.text-stroke': {
          '-webkit-text-stroke': '1px #53265F',
          'text-stroke': '1px #53265F',
        },
      });
    }),
  ],
};
export default config;
