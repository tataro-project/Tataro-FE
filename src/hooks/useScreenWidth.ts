import { useEffect, useState } from 'react';

const MOBILE_WIDTH = 768;

const useScreenWidth = (
  breakpoint?: number,
): { isInit: boolean; isMobile: boolean; isCustomWidth?: boolean } => {
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCustomWidth, setIsCustomWidth] = useState<boolean>(false);

  useEffect(() => {
    setIsInit(true);

    const mediaQueryMobile = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`);
    const mediaQueryCustom =
      breakpoint !== undefined ? window.matchMedia(`(max-width: ${breakpoint}px)`) : null;

    const updateStates = () => {
      setIsMobile(mediaQueryMobile.matches);
      if (mediaQueryCustom) setIsCustomWidth(mediaQueryCustom.matches);
    };

    updateStates();

    mediaQueryMobile.addEventListener('change', updateStates);
    if (mediaQueryCustom) mediaQueryCustom.addEventListener('change', updateStates);

    return () => {
      mediaQueryMobile.removeEventListener('change', updateStates);
      if (mediaQueryCustom) mediaQueryCustom.removeEventListener('change', updateStates);
    };
  }, [breakpoint]);

  return breakpoint !== undefined ? { isInit, isMobile, isCustomWidth } : { isInit, isMobile };
};

export default useScreenWidth;
