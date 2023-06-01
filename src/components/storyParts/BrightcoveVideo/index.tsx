import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer';
import { StoryPart } from '@/models/types/storyPart';
import React from 'react';

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <BrightcoveVideoPlayer
        entity={data}
        isStoryPart={true}
      />
    </div>
  ) : (
    <></>
  );

export default renderStoryPart;
