import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { overrideVideoMetadata } from '@/helpers/metadataHelper';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import { metadata as parentMetadata } from 'src/app/[[...pageName]]/page';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  slug?: string;
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideDescription?: boolean;
  hideRoofline?: boolean;
  hideTitle?: boolean;
  hideSocial?: boolean;
  hideRelatedItems?: boolean;
  preventSettingMetadata?: boolean;
};

const Story = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  const invalidSlugErrorMessage = 'Cannot render Story module with empty slug';
  if (!Object.hasOwn(props, 'slug') || !props.slug?.length) {
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
  if (getBooleanProperty(props.preventSettingMetadata)) {
    overrideVideoMetadata(parentMetadata, storyEntity);
  }

  return (
    <>
      <StoryHeader
        variables={data.variables}
        storyEntity={storyEntity}
        {...data.properties}
      ></StoryHeader>
      <StoryParts storyEntity={storyEntity}></StoryParts>
      <RelatedItems
        relations={storyEntity?.relations}
        hide={getBooleanProperty(props.hideRelatedItems)}
      ></RelatedItems>
    </>
  );
};
export default Story;
