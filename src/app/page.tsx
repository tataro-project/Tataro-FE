'use client';
import TaroSwiper from '@/components/mainPage/taroSwiper';
import moon from '@images/moon.svg';
import logo from '@images/logo.svg';
import blueCloud from '@images/blueCloud.svg';
import pinkCloud from '@images/pinkCloud.svg';
import Image from 'next/image';
import Button from '@common/button';
import Link from 'next/link';
import ReviewBox from '@/components/mainPage/reviewBox';
import { mockReviews } from '@/components/reveiws/mockReviews';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Home = () => {
  const bestReviews = mockReviews;
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className=" flex flex-col items-center h-full w-full gap-20">
      <div>
        <Image
          src={moon}
          alt="moon"
          width={80}
          className="absolute -translate-x-[80px] translate-y-[25px] "
        />
        <Image src={logo} alt="logo" width={320} />
      </div>
      <div className="md:max-w-4xl max-w-md">
        <TaroSwiper />
      </div>
      <div className="absolute left-0 md:translate-y-[400px] translate-y-[2000px] z-20 md:w-[700px] w-[300px]">
        <Image
          src={blueCloud}
          alt="blue-cloud"
          data-aos="fade-right"
          data-aos-easing="400"
          data-aos-offset="950"
          data-aos-duration="1000"
        />
      </div>
      <Link href={'tarotReading'} className="z-50">
        <Button variant="startButton" className="md:text-2xl text-xl ">
          상담 시작 하기
        </Button>
      </Link>
      <div
        className="flex flex-col h-full p-20 text-center text-purple font-gMedium"
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
      <div className="absolute right-0 translate-y-[1100px] md:w-[600px] w-[300px] z-10">
        <Image
          src={pinkCloud}
          alt="pink-cloud"
          priority
          data-aos="fade-up"
          data-aos-offset="1400"
          data-aos-duration="1000"
        />
      </div>
      <div
        className="grid grid-cols-2 gap-4 p-10"
        data-aos="fade-up"
        data-aos-easing="400"
        data-aos-offset="250"
        data-aos-duration="1000"
      >
        {bestReviews.map(review => (
          <ReviewBox
            key={review.id}
            title={review.title}
            content={review.content}
            nickname={review.nickname}
            createdAt={review.created_at}
            updatedAt={review.updated_at}
            imgUrl={review.img_url}
            viewCount={review.view_count}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
