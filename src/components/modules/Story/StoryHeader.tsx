import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';
import React from 'react';
import Picture from '@/components/commons/Picture/Picture';

type StoryHeaderProps = {
  storyEntity: DistributionEntity;
};

type StoryHeaderDefaultImage = {
  width: number;
  height: number;
  url: string;
};

const StoryHeader = ({ storyEntity }: StoryHeaderProps) => {
  const defaultThumbnail = {
    width: 300,
    height: 250,
    url: '/assets/default-thumbnail.jpg',
  } as StoryHeaderDefaultImage;

  const imageUrl = getSrcWithTransformation(
    storyEntity.thumbnail?.templateUrl ? storyEntity?.thumbnail?.templateUrl : defaultThumbnail.url,
    transformations.thumbnail_wide_detail.desktop.transformation
  );

  return (
    <ModuleContainer
      isFullWidth
      className="relative first:mt-0 lg:first:mt-0"
    >
      <div
        className="bg-[length:100vh] md:bg-cover bg-no-repeat min-h-[40svh] md:min-h-[60svh] lg:min-h-[80svh] bg-fixed bg-top"
        style={{
          backgroundImage: `url('${imageUrl}')`,
        }}
      ></div>
    </ModuleContainer>
  );
};

export default StoryHeader;
