'use client';

import Image from 'next/image';
import Magician from '@images/Magician.svg';
import Thefool from '@images/TheFool.svg';
import Empress from '@images/Empress.svg';
import TarotBack from '@images/tarotBack.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

const TaroSwiper = () => {
  const cards = [
    Magician,
    Thefool,
    Empress,
    Magician,
    Thefool,
    Empress,
    Magician,
    Thefool,
    Empress,
    Magician,
    Thefool,
    Empress,
  ];
  return (
    <Swiper
      modules={[Autoplay, EffectCoverflow]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      slidesPerView={4.285}
      spaceBetween={0}
      speed={1700}
      centeredSlides={true}
      effect={'coverflow'}
      grabCursor={true}
      autoHeight={false}
      coverflowEffect={{
        rotate: 0,
        slideShadows: false,
      }}
      loop={true}
    >
      {cards.map((img, index) => (
        <SwiperSlide key={index}>
          {({ isActive, isNext, isPrev }) =>
            isActive || isNext || isPrev ? (
              <Image src={img} alt={`card-${index}`} className="h-[370px]" />
            ) : (
              <Image src={TarotBack} alt="card-back" />
            )
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default TaroSwiper;
