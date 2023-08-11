import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { overrideStoryMetadata } from '@/helpers/metadataHelper';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import { metadata as parentMetadata } from 'src/app/[[...pageName]]/page';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
};

const Story = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  if (!Object.hasOwn(props, 'slug') || !props.slug?.length) {
    const invalidSlugErrorMessage = 'Cannot render Story module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }

  const storyEntity = await getEntity('stories', props.slug, {
    hasLinkRulesForRelationsAndParts: true,
    hasThumbnailPlaceholder: true,
    variables: data.variables,
  });
  if (storyEntity == null) {
    logger.log(`Cannot find Story entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }
  // Override parent metadata
  if (getBooleanProperty(props.preventSettingMetadata)) {
    overrideStoryMetadata(parentMetadata, storyEntity);
  }

  return (
    <article>
      <StoryHeader
        variables={data.variables}
        storyEntity={storyEntity}
        {...data.properties}
      ></StoryHeader>
      <StoryParts storyEntity={storyEntity}></StoryParts>
      <RelatedItems
        relations={storyEntity?.relations}
        hide={false}
      ></RelatedItems>
    </article>
  );
};
export default Story;
