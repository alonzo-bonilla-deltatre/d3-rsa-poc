'use client';

import { ReactNode } from 'react';
import { renderSvgIcon } from '@/components/icons';
import useTranslate from '@/hooks/useTranslate';

type OverlayProps = {
  additionalClasses?: string;
  children?: ReactNode;
  onCloseHandler: () => void;
};

const Overlay = ({ additionalClasses = '', children = '', onCloseHandler }: OverlayProps) => {
  const translate = useTranslate();
  return (
    <div
      className={`flex fixed top-0 bottom-0 left-0 right-0 w-full h-full items-center justify-center z-50 opacity-90 ${additionalClasses}`}
      id="overlay"
    >
      <button
        onClick={onCloseHandler}
        className="text-gray-400 cursor-pointer absolute ltr:right-8 rtl:left-8 top-8 cursor-pointer"
        aria-label={translate('close')}
      >
        {renderSvgIcon('Close', { fill: 'white', width: 12, height: 12 })}
      </button>
      {children}
    </div>
  );
};

export default Overlay;
