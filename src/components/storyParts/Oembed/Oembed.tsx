import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Oembed from '@/components/commons/Oembed/Oembed';

const OembedStoryPart = ({ data }: { data: StoryPart }) => <Oembed entity={data} />;

export default OembedStoryPart;
