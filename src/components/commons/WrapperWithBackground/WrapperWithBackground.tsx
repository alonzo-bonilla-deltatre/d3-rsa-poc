import styles from '@/components/commons/WrapperWithBackground/WrapperWithBackground.module.scss';
import { CSSProperties, ReactNode } from 'react';

type WrapperBackgroundPosition =
  | 'top-left'
  | 'top-right'
  | 'top'
  | 'center'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom';

export type WrapperWithBackgroundProps = {
  position?: WrapperBackgroundPosition;
  imageUrl?: string;
  imageMobileUrl?: string;
  customPosition?: string;
  size?: number;
  sizeMobile?: number;
  sizeClass?: 'bg-cover' | 'bg-contain' | 'bg-auto';
  children: ReactNode;
  additionalClasses?: string;
  clippedBackground?: boolean;
};

const WrapperWithBackground = ({
  position,
  imageUrl = '/assets/default-thumbnail.jpg',
  imageMobileUrl = '/assets/default-thumbnail.jpg',
  customPosition,
  size = 100,
  sizeMobile = 100,
  sizeClass,
  children,
  additionalClasses,
  clippedBackground,
}: WrapperWithBackgroundProps) => {
  const bgPositionClasses: Record<WrapperBackgroundPosition, string> = {
    'top-left': '',
    'top-right': 'bg-right-top',
    top: 'bg-top',
    'bottom-left': 'bg-left-bottom',
    'bottom-right': 'bg-right-bottom',
    center: 'bg-center',
    bottom: 'bg-bottom',
  };

  const bgSizeDesktopClass = !sizeClass ? `desktop-custom-bg-size-${size}` : sizeClass;
  const bgSizeMobileClass = !sizeClass ? `custom-bg-size-${sizeMobile}` : '';
  const bgPositionClass = position ? bgPositionClasses[position] : '';

  return (
    <div className={styles.wrapperWithBackground}>
      <div
        className={`background-container ${
          clippedBackground ? '-clipped' : ''
        } ${bgSizeMobileClass} ${bgSizeDesktopClass} ${bgPositionClass} ${additionalClasses || ''}`}
        style={
          {
            '--wrapper-background-desktop-url': `url(${imageUrl})`,
            '--wrapper-background-mobile-url': `url(${imageMobileUrl})`,
            backgroundPosition: customPosition && !position ? customPosition : '',
          } as CSSProperties
        }
      ></div>
      {children}
    </div>
  );
};

export default WrapperWithBackground;
