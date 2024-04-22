import React, { SVGProps } from 'react';
import HamburgerMenu from '@/components/icons/HamburgerMenu/HamburgerMenu';

export const icons = {
  HamburgerMenu,
};

export const renderSvgIcon = (icon: keyof typeof icons, props?: SVGProps<SVGSVGElement>) => {
  if (!icons[icon]) {
    return null;
  }
  const IconComponent: React.ElementType = icons[icon];
  return (
    <IconComponent
      width={24}
      height={24}
      {...props}
    />
  );
};
