import useIsMobile from '@/hooks/useIsMobile';
import { LogIn, Menu, UserRound, BellDot } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  // const isMobile = useIsMobile();
  // const pathname: string = usePathname();

  return (
    <div className="flex justify-between fixed z-30 top-0 left-0 w-full p-4">
      <Link href="/">
        <div className="w-32 h-16 bg-logo bg-center bg-contain bg-no-repeat" aria-label="로고" />
      </Link>
      <div className="flex gap-8">
        <Link href="/login">
          <LogIn className=" text-blueGray" strokeWidth={1.5} absoluteStrokeWidth />
        </Link>
        <Link href="/mypage">
          <UserRound className=" text-blueGray" strokeWidth={1.5} absoluteStrokeWidth />
        </Link>
        <BellDot className=" text-blueGray" strokeWidth={1.5} absoluteStrokeWidth>
          {/* 알림 왔을 때 동그라미 색 표시 */}
          <circle cx="18" cy="8" r="4" className="fill-deepPink stroke-none" />
        </BellDot>
        <Menu className="text-blueGray" strokeWidth={1.5} absoluteStrokeWidth />
      </div>
    </div>
  );
};
export default Header;
