import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import React from 'react';
import { nanoid } from 'nanoid';
const LiveBloggingServer = dynamic(() => import('@/components/modules/LiveBlogging/LiveBloggingServer'));

const LiveBloggingWrapper = ({ data }: { data: ComponentProps }) => <LiveBloggingServer data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <LiveBloggingWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
