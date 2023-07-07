import ModuleTitle from '@/components/common/ModuleTitle';
import { ComponentProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import GridList from '@/components/common/list/Grid';
import { HeroSwiper } from '../Hero/HeroSwiper';
import MosaicContainer from '../Mosaic/MosaicContainer';
import { DistributionEntity } from '@/models/types/forge';
import { getFilteredItems } from '@/helpers/forgeDistributionEntityHelper';

type ModuleProps = {
  moduleTitle?: string;
  headingLevel?: string;
  displayModuleTitle?: string;
  skip?: number;
  limit?: number;
  tags?: string;
  entityType?: string;
  selectionSlug?: string;
  layout?: string;
};

const renderList = (layout: string | undefined, items: DistributionEntity[] | null) => {
  switch (layout) {
    case 'hero':
      return (
        <HeroSwiper
          slides={getFilteredItems(items, Number(5))}
          hideDate={true}
        />
      );
    case 'mosaic':
      return (
        <div className="flex px-8">
          <MosaicContainer items={items}></MosaicContainer>
        </div>
      );

    default:
      return <GridList items={items} />;
  }
};

const EditorialList = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, skip, limit, tags, selectionSlug, entityType, layout } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType?.length) {
    logger.log('Cannot render TestList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const items = await getEntityList(selectionSlug, entityType, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit,
    tags,
    variables: data.variables,
  });

  return (
    items?.length && (
      <section className="mt-8">
        <ModuleTitle
          canRender={displayModuleTitle?.toString() === 'true'}
          heading={headingLevel}
          text={moduleTitle}
        ></ModuleTitle>
        {renderList(layout, items)}
      </section>
    )
  );
};
export default EditorialList;
