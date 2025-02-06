import TaroSwiper from '@/components/mainPage/taroSwiper';
import moon from '@images/moon.svg';
import logo from '@images/logo.svg';
import blueCloud from '@images/blueCloud.png';
import pinkCloud from '@images/pinkcloud.png';
import Image from 'next/image';

const Home = () => {
  return (
    <div className=" flex flex-col items-center h-full w-full gap-40">
      <div className="">
        <Image
          src={moon}
          alt="moon"
          width={150}
          height={70}
          className="absolute -translate-x-[100px] translate-y-[50px] "
        />
        <Image src={logo} alt="logo" width={500} height={150} />
      </div>
      <div className="flex max-w-5xl  h-[500px]">
        <TaroSwiper />
      </div>
      <Image
        src={blueCloud}
        alt="blue-cloud"
        className="absolute left-0 md:translate-y-[600px] translate-y-[700px] z-50 md:w-[700px] w-[300px] "
      />
      <div className="flex flex-col h-full p-20 text-center text-purple font-gMedium ">
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
      <Image
        src={pinkCloud}
        alt="logo"
        width={600}
        height={200}
        className="absolute right-0 translate-y-[1100px] "
      />
    </div>
  );
};

export default Home;
