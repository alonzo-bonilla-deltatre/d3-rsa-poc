import React from 'react';
import Picture from '@/components/common/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { StoryPart } from '@/models/types/storyPart';

const Photo = ({ ...props }: StoryPart) => {
  return props?.slug && props.image ? (
    <>
      <figure>
        <Picture
          src={props.image.templateUrl}
          alt={props.image.title ?? ''}
          transformations={transformations.thumbnailDetail}
          className="w-full h-full object-cover"
        ></Picture>
      </figure>
    </>
  ) : (
    <></>
  );
};

export default Photo;
