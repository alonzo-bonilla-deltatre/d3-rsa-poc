import React from 'react';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import Picture from '@/components/commons/Picture/Picture';
import { StoryPart } from '@/models/types/storyPart';

const Photo = ({ data }: { data: StoryPart }) => {
  if (!data || !data.image) {
    return null;
  }
  return (
    <Picture
      src={data?.image?.templateUrl ?? ''}
      alt={data?.image?.title ?? ''}
      transformations={transformations.thumbnail_landscape_detail}
      className={'w-full h-full object-cover rounded-lg'}
    ></Picture>
  );
};

export default Photo;
