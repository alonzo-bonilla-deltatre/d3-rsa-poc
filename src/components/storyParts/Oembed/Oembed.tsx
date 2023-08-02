import { StoryPart } from '@/models/types/storyPart';
import React from 'react';
import Oembed from '@/components/common/Oembed/Oembed';

const OembedStoryPart = ({ ...data }: StoryPart) =>
  data ? (
    <div className="mx-20 mt-20 col-start-1">
      <Oembed entity={data} />
    </div>
  ) : (
    <></>
  );

export default OembedStoryPart;
