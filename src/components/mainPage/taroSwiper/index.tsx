'use client';

// import Image from 'next/image';
// import Magician from '@images/Magician.svg';
// import Thefool from '@images/TheFool.svg';
// import Empress from '@images/Empress.svg';
// import CardBack from '@images/CardBack.svg';

import clsx from 'clsx';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';

const TaroSwiper = () => {
  const cards = [
    'Magician',
    'Thefool',
    'Empress',
    'Magician',
    'Thefool',
    'Empress',
    'Magician',
    'Thefool',
    'Empress',
  ];
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      slidesPerView={4.284}
      spaceBetween={2}
      speed={1700}
      centeredSlides={true}
      effect={'coverflow'}
      grabCursor={true}
      autoHeight={false}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
      }}
      loop
    >
      {cards.map((img, index) => (
        <SwiperSlide key={index}>
          {({ isActive, isNext, isPrev }) =>
            isActive || isNext || isPrev ? (
              <div
                className={clsx(
                  'md:w-60 w-30 h-96 bg-center bg-contain bg-no-repeat',
                  img === 'Thefool' && 'bg-theFool',
                  img === 'Magician' && 'bg-magician',
                  img === 'Empress' && 'bg-empress',
                )}
              />
            ) : (
              <div className="md:w-52 w-30 h-96 bg-cardBack bg-center bg-contain bg-no-repeat" />
            )
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default TaroSwiper;
