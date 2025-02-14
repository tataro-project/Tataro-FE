'use client';

import clsx from 'clsx';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import 'swiper/css/pagination';

const TaroSwiper = () => {
  const cardClassNameBg = [
    'bg-magician',
    'bg-theFool',
    'bg-empress',
    'bg-magician',
    'bg-theFool',
    'bg-empress',
    'bg-magician',
    'bg-theFool',
    'bg-empress',
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
      {cardClassNameBg.map((img, index) => (
        <SwiperSlide key={index}>
          {({ isActive, isNext, isPrev }) =>
            isActive || isNext || isPrev ? (
              <div className={clsx('md:w-60 w-30 h-96 bg-center bg-contain bg-no-repeat', img)} />
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
