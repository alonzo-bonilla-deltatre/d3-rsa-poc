import Oembed from '@/components/common/Oembed/Oembed';
import { StoryPart } from '@/models/types/storyPart';
import React from 'react';

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <Oembed entity={data} />
    </div>
  ) : (
    <></>
  );

export default renderStoryPart;
