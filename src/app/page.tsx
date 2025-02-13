'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Aos from 'aos';

import ReviewBox from '@/components/mainPage/reviewBox';
import TaroSwiper from '@/components/mainPage/taroSwiper';
import { mockReviews } from '@/components/reviews/mockData';

import Button from '@common/button';
import LoadingSpinner from '@common/loadingSpinner';

import blueCloud from '@images/blueCloud.svg';
import logo from '@images/logo.svg';
import moon from '@images/moon.svg';
import pinkCloud from '@images/pinkCloud.svg';

import 'aos/dist/aos.css';

const Home = () => {
  const bestReviews = mockReviews;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Aos.init();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className=" flex flex-col items-center h-full w-full gap-20">
      <div>
        <Image
          src={moon}
          alt="moon"
          width={80}
          className="absolute -translate-x-[80px] translate-y-[25px] "
        />
        <Image src={logo} alt="logo" className="max-w-[320px]" />
      </div>
      <div className="md:max-w-4xl max-w-md">
        <TaroSwiper />
      </div>
      <div className="absolute left-0 md:translate-y-[400px] translate-y-[530px] z-20 md:max-w-[700px] max-w-[400px] ">
        <Image
          src={pinkCloud}
          alt="pink-cloud"
          data-aos="fade-right"
          data-aos-easing="400"
          data-aos-offset="800"
          data-aos-duration="1200"
        />
      </div>
      <Link href={'tarotReading'} className="z-50" tabIndex={-1}>
        <Button variant="startButton" className="md:text-2xl text-xl ">
          상담 시작 하기
        </Button>
      </Link>
      <div
        className="flex flex-col h-full p-20 text-center text-purple font-gMedium z-50 "
        data-aos="fade-up"
        data-aos-easing="200"
        data-aos-offset="300"
        data-aos-duration="1000"
      >
        <p>운명적인 사랑을 찾는 첫걸음, 당신만의 타로 이야기</p>
        <br />
        <p>사랑, 관계, 그리고 당신의 마음속 이야기를 타로를 통해 해석 해드립니다.</p>
        <p>연애 운, 재회 가능성, 상대의 속마음 등</p>
        <p>타로로 시작하는 사랑의 여정</p>
        <p>당신만의 맞춤 상담을 해드립니다.</p>
        <br />
        <p>언제나 당신의 사랑과 함께합니다.</p>
        <br />
        <p>하쿠나마타타로</p>
      </div>
      <div className="absolute right-0 md:translate-y-[1000px] translate-y-[1200px] md:max-w-[600px] max-w-[300px] ">
        <Image
          src={blueCloud}
          alt="blue-cloud"
          priority
          data-aos="fade-up"
          data-aos-offset="1400"
          data-aos-duration="1000"
        />
      </div>
      <div
        className="grid md:grid-cols-2 grid-cols-1 md:gap-5 md:p-10 gap-10 mt-40 p-10 z-10"
        data-aos="fade-up"
        data-aos-easing="400"
        data-aos-duration="1000"
      >
        {bestReviews.map(review => (
          <ReviewBox
            key={review.id}
            id={review.id}
            chatlog_id={review.chatlog_id}
            title={review.title}
            content={review.content}
            nickname={review.nickname}
            created_at={review.created_at}
            updated_at={review.updated_at}
            img_url={review.img_url}
            view_count={review.view_count}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
