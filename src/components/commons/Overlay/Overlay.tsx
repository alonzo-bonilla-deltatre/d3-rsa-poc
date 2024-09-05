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
      className={`fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center opacity-90 ${additionalClasses}`}
      id="overlay"
    >
      <button
        onClick={onCloseHandler}
        className="absolute top-8 cursor-pointer text-gray-400 ltr:right-8 rtl:left-8"
        aria-label={translate('close')}
      >
        {renderSvgIcon('Close', { fill: 'white', width: 12, height: 12 })}
      </button>
      {children}
    </div>
  );
};

export default Overlay;
