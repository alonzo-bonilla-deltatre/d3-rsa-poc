import { SVGProps } from 'react';
import ArrowLeftRounded from '@/components/icons/ArrowLeftRounded/ArrowLeftRounded';
import ArrowRight from '@/components/icons/ArrowRight/ArrowRight';
import ArrowRightRounded from '@/components/icons/ArrowRightRounded/ArrowRightRounded';
import CaretLeftIcon from '@/components/icons/CaretLeft/CaretLeftIcon';
import CaretRightIcon from '@/components/icons/CaretRight/CaretRightIcon';
import CheckIcon from '@/components/icons/CheckIcon/CheckIcon';
import CopyLinkRounded from '@/components/icons/CopyLinkRounded/CopyLinkRounded';
import FacebookRounded from '@/components/icons/FacebookRounded/FacebookRounded';
import HamburgerMenu from '@/components/icons/HamburgerMenu/HamburgerMenu';
import HamburgerMenuClose from '@/components/icons/HamburgerMenuClose/HamburgerMenuClose';
import HamburgerMenuTwoRow from '@/components/icons/HamburgerMenuTwoRow/HamburgerMenuTwoRow';
import InstagramRounded from '@/components/icons/InstagramRounded/InstagramRounded';
import LoadingIcon from '@/components/icons/LoadingIcon/LoadingIcon';
import Lock from '@/components/icons/Lock/Lock';
import Pdf from '@/components/icons/Pdf/Pdf';
import Play from '@/components/icons/Play/Play';
import QuoteLeft from '@/components/icons/QuoteLeft/QuoteLeft';
import QuoteRight from '@/components/icons/QuoteRight/QuoteRight';
import RemoveIcon from '@/components/icons/RemoveIcon/RemoveIcon';
import TwitterRounded from '@/components/icons/TwitterRounded/TwitterRounded';
import Unlock from '@/components/icons/Unlock/Unlock';
import WhatsAppRounded from '@/components/icons/WhatsAppRounded/WhatsAppRounded';
import XRounded from '@/components/icons/XRounded/XRounded';
import YouTubeRounded from '@/components/icons/YouTubeRounded/YouTubeRounded';
import Event from '@/components/icons/Event/Event';
import Close from '@/components/icons/Close/Close';
import Login from '@/components/icons/Login/Login';
import Ticket from '@/components/icons/Ticket/Ticket';
import Search from '@/components/icons/Search/Search';
import Shop from '@/components/icons/Shop/Shop';

export const icons = {
  ArrowLeftRounded,
  ArrowRight,
  ArrowRightRounded,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  Close,
  CopyLinkRounded,
  Event,
  FacebookRounded,
  HamburgerMenu,
  HamburgerMenuClose,
  HamburgerMenuTwoRow,
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
  TwitterRounded,
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
