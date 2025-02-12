import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { FocusTrap } from 'focus-trap-react';
import { X } from 'lucide-react';

import useOutsideClick from '@/hooks/useOutsideClick';
import useUserActions from '@/hooks/useUserActions';
import useUserStore from '@/stores/userStore';

import Button from '@common/button';

import SidebarProps from './types';
import SIDEBAR_MENUS from './constants';

const Sidebar = ({ isOpen, close }: SidebarProps) => {
  const { logout } = useUserActions();
  const { user } = useUserStore();

  const router = useRouter();

  const ref = useOutsideClick(() => {
    if (isOpen) close();
  });

  const handleMenuClick = (path: string) => {
    router.push(path);
    close();
  };

  const toggleAuth = () => {
    if (user) logout();

    close();
    router.push(user ? '/' : '/login');
  };

  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ initialFocus: false }}>
      <div className="fixed">
        <div
          className={clsx(
            'fixed top-0 left-0 w-screen h-screen bg-purple bg-opacity-10 pointer-events-none transition duration-300',
            !isOpen && 'opacity-0',
          )}
        />

        <div
          ref={ref}
          className={clsx(
            'fixed top-0 right-0 z-40 w-60 md:w-64 h-full px-6 pt-12 pb-6 border-l border-purple bg-softPink transition duration-300',
            isOpen && 'opacity-100 -translate-x-0',
            !isOpen && 'opacity-0 translate-x-72 md:translate-x-80',
          )}
        >
          <button tabIndex={isOpen ? 0 : -1} onClick={close} className="absolute top-1 left-1">
            <X strokeWidth={1.5} className="text-purple" />
          </button>

          <div className="flex flex-col justify-between items-start h-full">
            <div className="flex flex-col gap-10 relative right-14">
              <Button variant="menuButton" disabled>
                Menu
              </Button>
              <div className="flex flex-col gap-5 grow">
                {SIDEBAR_MENUS.map(({ menu, path }) => (
                  <Button
                    key={menu}
                    tabIndex={isOpen ? 0 : -1}
                    variant="menuButton"
                    onClick={() => handleMenuClick(path)}
                  >
                    {menu}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              tabIndex={isOpen ? 0 : -1}
              variant="simple"
              className="self-end font-lilita text-lg md:text-xl"
              onClick={toggleAuth}
            >
              {user ? 'Logout' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default Sidebar;
