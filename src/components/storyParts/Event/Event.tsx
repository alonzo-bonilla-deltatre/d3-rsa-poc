import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import dynamic from 'next/dynamic';

// @ts-ignore
const EventBanner = dynamic(() => import('@/components/common/events/EventBanner/EventBanner'));

const Event = ({ ...data }: StoryPart) => (data ? <EventBanner storyPart={data}></EventBanner> : <></>);

export default Event;
