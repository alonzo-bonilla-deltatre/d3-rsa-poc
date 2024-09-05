'use client';

import { CSSProperties, ReactNode } from 'react';

type WithOverlayContentType = {
  wrapperClassNames?: string;
  classNames?: string;
  children: ReactNode;
  content: ReactNode;
  style?: CSSProperties;
};

const WithOverlayContent = ({
  wrapperClassNames = '',
  classNames = 'right-0 top-0 rtl:left-0',
  children,
  content,
  style = {},
}: WithOverlayContentType) => (
  <div
    className={`relative ${wrapperClassNames}`}
    style={style}
  >
    {children}
    <div className={`pointer-events-none absolute ${classNames}`}>{content}</div>
  </div>
);

export default WithOverlayContent;
