import TaroSwiper from '@/components/mainPage/taroSwiper';
import Image from 'next/image';

const Home = () => {
  return (
    <div className=" flex flex-col items-center h-full w-full gap-10">
      <div className="">
        <Image
          src="/images/moon.svg"
          alt="moon"
          width={70}
          height={70}
          className="absolute -translate-x-[100px] -translate-y-[0px] "
        />
        <Image src="/images/logo.svg" alt="logo" width={300} height={150} />
      </div>
      <div className="max-w-3xl">
        <TaroSwiper />
      </div>
    </div>
  );
};

export default Home;
