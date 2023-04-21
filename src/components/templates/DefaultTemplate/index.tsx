import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import dynamic from 'next/dynamic';
import { nanoid } from 'nanoid';
import React from 'react';

// @ts-ignore
const Header = dynamic(() => import('@/components/layouts/Header'));
// @ts-ignore
const Footer = dynamic(() => import('@/components/layouts/Footer'));

const DefaultTemplate = ({ ...props }: ComponentProps) => {
  const mainSlot = 'main';

  return (
    <div className="overflow-hidden flex flex-col justify-between min-h-[100vh]">
      <Header />
      <main>{renderItemsInSlot(props.items, mainSlot)}</main>
      <Footer />
    </div>
  );
};

const render = ({ ...props }: ComponentProps): React.ReactElement =>
  props ? (
    <DefaultTemplate
      key={nanoid()}
      {...props}
    />
  ) : (
    <></>
  );

export default render;
