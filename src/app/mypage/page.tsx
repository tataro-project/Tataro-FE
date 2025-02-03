'use client';

import SUBMENUS from '@/components/myPage/constants';
import { MyPageSubmenus } from '@/components/myPage/types';
import useIsMobile from '@/hooks/useIsMobile';
import Button from '@common/button';
import ContentBox from '@common/contentBox';
import { useState } from 'react';

const MyPage = () => {
  const { isMobile } = useIsMobile();
  const [submenu, setSubmenu] = useState('Profile');

  const handleClickSubmenu = (selectedSubmenu: MyPageSubmenus) =>
    selectedSubmenu !== submenu && setSubmenu(selectedSubmenu);

  return (
    <>
      {!isMobile && (
        <div className="relative w-full max-w-5xl h-full">
          <div className="flex justify-start items-center h-full">
            <div className="absolute top-1/2 right-12 z-20 -translate-y-[384px]">
              <ContentBox size="w-64 h-[512px]" layout="justify-start gap-6 pt-8">
                <h3 className="font-lilita text-4xl text-cream stroke">My Page</h3>
                <div className="flex flex-col gap-5 relative left-12">
                  {SUBMENUS.map(({ submenu: submenuItem }) => (
                    <Button
                      key={submenuItem}
                      variant="submenuButton"
                      isSelected={submenu === submenuItem}
                      onClick={() => handleClickSubmenu(submenuItem)}
                    >
                      {submenuItem}
                    </Button>
                  ))}
                </div>
              </ContentBox>
            </div>
            {SUBMENUS.map(
              ({ submenu: submenuItem, content: Content }) =>
                submenu === submenuItem && (
                  <ContentBox
                    key={`${submenuItem}-content`}
                    size="max-w-3xl max-h-[672px]"
                    layout="p-6"
                  >
                    <Content />
                  </ContentBox>
                ),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyPage;
