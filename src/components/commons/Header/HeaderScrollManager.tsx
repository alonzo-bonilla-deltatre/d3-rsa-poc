'use client';

import { useEffect } from 'react';

export type ScrollManagerProps = {
  defaultColor?: string;
  transparentClasses?: string[];
};

/**
 * Change the background of the header component via JS once the user has scrolled down
 * Returns transparent if the users scrolls at the top again
 * @param defaultColor the default theme color
 * @param transparentClasses
 */
export const HeaderScrollManager = ({ defaultColor = 'bg-grey-900', transparentClasses = [] }: ScrollManagerProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document?.querySelector('#header-nav');
      if (window?.scrollY >= 70) {
        header?.classList.add(defaultColor);
        transparentClasses?.forEach((className) => {
          if (header?.classList.contains(className)) {
            header.classList.remove(className);
          }
        });
      } else {
        transparentClasses?.forEach((className) => {
          if (header?.classList.add(className)) {
            header.classList.remove(className);
          }
        });
        header?.classList.remove(defaultColor);
      }
    };
    window.addEventListener('scroll', handleScroll); // desktop
    window.addEventListener('touchmove', handleScroll); // mobile
    // clean-up callback function on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [defaultColor, transparentClasses]);
  return <></>; // mandatory being a jsx element
};
