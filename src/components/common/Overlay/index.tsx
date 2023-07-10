'use client';

import { ReactNode } from 'react';

type OverlayProps = {
  additionalClasses?: string;
  children?: ReactNode;
  onCloseHandler: () => void;
};

const Overlay = ({ additionalClasses = '', children = '', onCloseHandler }: OverlayProps) => {
  return (
    <div
      className={`flex fixed top-0 bottom-0 left-0 right-0 w-full h-full items-center justify-center z-50 opacity-90 bg-black ${additionalClasses}`}
      id="overlay"
    >
      <button
        onClick={onCloseHandler}
        className="text-xl text-gray-400 cursor-pointer absolute right-8 top-8"
      >
        X
      </button>
      {children}
    </div>
  );
};

export default Overlay;
