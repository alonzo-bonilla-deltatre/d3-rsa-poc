import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import dynamic from 'next/dynamic';

// @ts-ignore
const EventBanner = dynamic(() => import('@/components/common/events/EventBanner/EventBanner'));

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? <EventBanner storyPart={data}></EventBanner> : <></>;

export default renderStoryPart;
