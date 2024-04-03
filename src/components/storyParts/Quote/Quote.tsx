import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Quote from '@/components/commons/Quote/Quote';

const QuoteStoryPart = ({ data }: { data: StoryPart }) => <Quote entity={data} />;

export default QuoteStoryPart;
