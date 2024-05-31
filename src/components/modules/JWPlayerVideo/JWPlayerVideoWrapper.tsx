import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import React from 'react';
import { nanoid } from 'nanoid';
const JWPlayerVideo = dynamic(() => import('@/components/modules/JWPlayerVideo/JWPlayerVideo'));

const JWPlayerVideoWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <JWPlayerVideo data={data} />
);

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <JWPlayerVideoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
