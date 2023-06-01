import Quote from '@/components/common/Quote';
import { StoryPart } from '@/models/types/storyPart';
import React from 'react';

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <Quote entity={data} />
    </div>
  ) : (
    <></>
  );

export default renderStoryPart;
