import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import dynamic from 'next/dynamic';
import React from 'react';

// @ts-ignore
const LiveBloggingServer = dynamic(() => import('@/components/modules/LiveBlogging/LiveBloggingServer'));

const LiveBloggingWrapper = ({ ...data }: ComponentProps) => {
  return <LiveBloggingServer {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <LiveBloggingWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
