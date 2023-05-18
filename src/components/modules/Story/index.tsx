import StoryHeader from '@/components/modules/Story/StoryHeader';
import StoryParts from '@/components/modules/Story/StoryParts';
import RelatedItems from '@/components/modules/Story/StoryRelatedItems';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/dapi';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/dapiService';
import logger from '@/utilities/logger';

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

  const storyEntity = await getEntity('stories', props.slug);

  return storyEntity ? (
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
  ) : (
    <div />
  );
};
export default Story;
