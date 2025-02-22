import React, { SVGProps } from 'react';

import ArrowLeftRounded from '@/components/icons/ArrowLeftRounded/ArrowLeftRounded';
import ArrowRightRounded from '@/components/icons/ArrowRightRounded/ArrowRightRounded';
import CaretLeft from '@/components/icons/CaretLeft/CaretLeftIcon';
import CaretRight from '@/components/icons/CaretRight/CaretRightIcon';
import CheckIcon from '@/components/icons/CheckIcon/CheckIcon';
import Close from '@/components/icons/Close/Close';
import CopyLinkRounded from '@/components/icons/CopyLinkRounded/CopyLinkRounded';
import Event from '@/components/icons/Event/Event';
import FacebookRounded from '@/components/icons/FacebookRounded/FacebookRounded';
import HamburgerMenu from '@/components/icons/HamburgerMenu/HamburgerMenu';
import InstagramRounded from '@/components/icons/InstagramRounded/InstagramRounded';
import LoadingIcon from '@/components/icons/LoadingIcon/LoadingIcon';
import Lock from '@/components/icons/Lock/Lock';
import Login from '@/components/icons/Login/Login';
import Pdf from '@/components/icons/Pdf/Pdf';
import Play from '@/components/icons/Play/Play';
import QuoteLeft from '@/components/icons/QuoteLeft/QuoteLeft';
import QuoteRight from '@/components/icons/QuoteRight/QuoteRight';
import RemoveIcon from '@/components/icons/RemoveIcon/RemoveIcon';
import Search from '@/components/icons/Search/Search';
import Shop from '@/components/icons/Shop/Shop';
import Ticket from '@/components/icons/Ticket/Ticket';
import Unlock from '@/components/icons/Unlock/Unlock';
import WhatsAppRounded from '@/components/icons/WhatsAppRounded/WhatsAppRounded';
import XRounded from '@/components/icons/XRounded/XRounded';
import YouTubeRounded from '@/components/icons/YouTubeRounded/YouTubeRounded';

export const icons = {
  ArrowLeftRounded,
  ArrowRightRounded,
  CaretLeft,
  CaretRight,
  CheckIcon,
  Close,
  CopyLinkRounded,
  Event,
  FacebookRounded,
  HamburgerMenu,
  InstagramRounded,
  LoadingIcon,
  Lock,
  Login,
  Pdf,
  Play,
  QuoteLeft,
  QuoteRight,
  RemoveIcon,
  Search,
  Shop,
  Ticket,
  Unlock,
  WhatsAppRounded,
  XRounded,
  YouTubeRounded,
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
