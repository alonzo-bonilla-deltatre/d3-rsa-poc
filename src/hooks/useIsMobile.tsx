import { DESKTOP_BREAKPOINT } from '@/utilities/constsUtility';
import { RefObject, useEffect, useState } from 'react';

/**
 * React hook for determining if the viewport is in mobile view.
 *
 * This hook uses the ResizeObserver API to observe changes to the dimensions of an element.
 * It sets the state to true if the viewport width is less than the desktop breakpoint, and false otherwise.
 *
 * @param {RefObject<HTMLElement>} containerRef - A ref object pointing to the element to observe.
 * @param {number} [desktopBreakpoint=DESKTOP_BREAKPOINT] - The viewport width at which to switch from mobile to desktop view.
 * @returns {boolean} A boolean value indicating whether the viewport is in mobile view.
 */
export const useIsMobile = (
  containerRef: RefObject<HTMLElement>,
  desktopBreakpoint: number = DESKTOP_BREAKPOINT
): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < desktopBreakpoint);
    };
    const resizeObserver = new ResizeObserver(checkIsMobile);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, desktopBreakpoint]);

  return isMobile;
};

export default useIsMobile;
