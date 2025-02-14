'use client';

import Image from 'next/image';
import Link from 'next/link';

import Button from '@common/button';

import sadTataroFace from '@images/sadTataroFace.gif';

const NotFoundPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center gap-10 p-4">
      <div>
        <p className="text-4xl text-center text-purple font-gBold">404 </p>
        <p className="text-2xl text-center text-purple font-gBold">page not found</p>
      </div>
      <Image src={sadTataroFace} alt="슬픈타타로얼굴" width={200} height={200} />

      <p className="text-2xl text-center text-purple font-gMedium">여긴 아무 것도 없군요...</p>

      <Link href="/">
        <Button variant="startButton" className="md:text-2xl text-xl ">
          울음 멈추기
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
