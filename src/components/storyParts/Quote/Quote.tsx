import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Quote from '@/components/common/Quote/Quote';

const QuoteStoryPart = ({ ...data }: StoryPart) =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <Quote entity={data} />
    </div>
  ) : (
    <></>
  );

export default QuoteStoryPart;
