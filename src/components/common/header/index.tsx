'use client';

import useScreenWidth from '@/hooks/useScreenWidth';
import { LogIn, Menu, UserRound, BellDot } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
import Sidebar from '@common/sidebar';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { isInit, isMobile } = useScreenWidth();
  const pathname = usePathname();

  if (!isInit) return null;

  return (
    <>
      <nav className="flex justify-between items-start fixed z-30 top-0 left-0 w-full p-4">
        {pathname !== '/' && (
          <Link href="/">
            <div
              className={clsx(
                'bg-logo bg-center bg-contain bg-no-repeat',
                isMobile ? 'w-24 h-12' : 'w-32 h-16',
              )}
              aria-label="로고"
            />
          </Link>
        )}
        <div className={clsx('flex gap-8', pathname === '/' && 'ml-auto')}>
          <Link href="/login">
            <LogIn
              className={clsx('text-blueGray', isMobile ? 'w-5 h-5' : 'w-6 h-6')}
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
          </Link>
          <Link href="/mypage">
            <UserRound
              className={clsx(' text-blueGray', isMobile ? 'w-5 h-5' : 'w-6 h-6')}
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
          </Link>
          <BellDot
            className={clsx(' text-blueGray', isMobile ? 'w-5 h-5' : 'w-6 h-6')}
            strokeWidth={1.5}
            absoluteStrokeWidth
          >
            {/* 알림 왔을 때 동그라미 색 표시 */}
            <circle cx="18" cy="8" r="4" className="fill-deepPink stroke-none" />
          </BellDot>
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu
              className={clsx('text-blueGray', isMobile ? 'w-5 h-5' : 'w-6 h-6')}
              strokeWidth={1.5}
              absoluteStrokeWidth
            />
          </button>
        </div>
        <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />
      </nav>
    </>
  );
};
export default Header;
