import Quote from '@/components/common/Quote';
import { StoryPart } from '@/models/types/storyPart';
import React from 'react';

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement => (data ? <Quote entity={data} /> : <></>);

export default renderStoryPart;
