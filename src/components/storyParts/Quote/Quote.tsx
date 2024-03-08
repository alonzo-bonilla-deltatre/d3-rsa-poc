import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Quote from '@/components/common/Quote/Quote';

const QuoteStoryPart = ({ data }: { data: StoryPart }) => <Quote entity={data} />;

export default QuoteStoryPart;
