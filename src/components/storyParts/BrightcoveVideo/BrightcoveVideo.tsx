import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer/BrightcoveVideoPlayer';
import { StoryPart } from '@/models/types/storyPart';
import React from 'react';

const BrightcoveVideo = ({ ...data }: StoryPart) =>
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

export default BrightcoveVideo;
