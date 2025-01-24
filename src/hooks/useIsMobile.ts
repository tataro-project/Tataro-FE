import { useState, useEffect } from 'react';

const useIsMobile = (
  breakpoint: number = 768,
): { isMobile: boolean | null; isMobileDevice: boolean | null } => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null);

  useEffect(() => {
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    setIsMobileDevice(/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent));

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return { isMobile, isMobileDevice };
};

export default useIsMobile;
