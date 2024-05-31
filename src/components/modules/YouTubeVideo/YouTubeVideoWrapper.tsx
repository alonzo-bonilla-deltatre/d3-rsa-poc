import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
import React from 'react';
import { nanoid } from 'nanoid';
const YouTubeVideo = dynamic(() => import('@/components/modules/YouTubeVideo/YouTubeVideo'));

const YouTubeVideoWrapper = ({ data }: { data: ComponentProps }): ReturnComponentRender => <YouTubeVideo data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => (
  <YouTubeVideoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
