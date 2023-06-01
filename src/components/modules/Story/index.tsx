import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import { metadata as parentMetadata } from 'src/app/[[...pageName]]/page';
import { overrideDefaultMetadata } from './StoryHelpers';

type ModuleProps = {
  slug: string;
  hideAuthor: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  hideSocial: boolean;
  hideRelatedItems: boolean;
  entity?: DistributionEntity | null | undefined;
  preventSettingMetadata: boolean;
};

const Story = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  const invalidSlugErrorMessage = 'Cannot render Story module with empty slug';
  if (!Object.hasOwn(props, 'slug') || !props.slug.length) {
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }

  const storyEntity = await getEntity('stories', props.slug, {
    hasLinkRulesForRelationsAndParts: true,
    hasThumbnailPlaceholder: true,
    variables: data.variables,
  });
  if (storyEntity == null) {
    logger.log(`Cannot find story entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  // Override parent metadata
  if (props.preventSettingMetadata && props.preventSettingMetadata.toString() === 'false') {
    overrideDefaultMetadata(parentMetadata, storyEntity);
  }

  return (
    <>
      <StoryHeader
        storyEntity={storyEntity}
        {...props}
      ></StoryHeader>
      <StoryParts storyEntity={storyEntity}></StoryParts>
      <RelatedItems
        relations={storyEntity.relations}
        hide={props.hideRelatedItems}
      ></RelatedItems>
    </>
  );
};
export default Story;
