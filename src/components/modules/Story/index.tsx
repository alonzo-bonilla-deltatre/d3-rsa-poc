import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/dapi';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/dapiService';
import logger from '@/utilities/logger';
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
  if (!Object.hasOwn(props, 'slug') || !props.slug.length) {
    logger.log('Cannot render Story module with empty slug', LoggerLevel.warning);
    return null;
  }

  const storyEntity = await getEntity('stories', props.slug);
  if (storyEntity == null) {
    logger.log(`Cannot find story entity with slug ${props.slug} `, LoggerLevel.warning);
    return <div />;
  }

  // Override parent metadata
  if (props.preventSettingMetadata.toString() === 'false') {
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
