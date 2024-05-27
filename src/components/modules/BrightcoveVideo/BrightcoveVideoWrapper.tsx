import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import React from 'react';
import { nanoid } from 'nanoid';
const BrightcoveVideo = dynamic(() => import('@/components/modules/BrightcoveVideo/BrightcoveVideo'));

const BrightcoveVideoWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <BrightcoveVideo data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <BrightcoveVideoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
