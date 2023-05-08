import { ComponentProps } from '@/models/types/components';
import { getEntity } from '@/services/dapiService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import { DistributionEntity } from '@/models/types/dapi';

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
};

const Story = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  if (!Object.hasOwn(props, 'slug') || !props.slug.length) {
    logger.log('Cannot render Story module with empty slug', LoggerLevel.warning);
    return null;
  }

  const storyEntityFetch = getEntity('stories', props.slug);

  const [storyEntity] = await Promise.all([storyEntityFetch]);

  return storyEntity ? (
    <>
      <StoryHeader storyEntity={storyEntity} {...props}></StoryHeader>
      <StoryParts storyEntity={storyEntity}></StoryParts>
      <RelatedItems relations={storyEntity.relations} hide={props.hideRelatedItems}></RelatedItems>
    </>
  ) : (
    <div />
  );
};
export default Story;
