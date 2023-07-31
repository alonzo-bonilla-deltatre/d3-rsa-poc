import ModuleTitle from '@/components/common/ModuleTitle/ModuleTitle';
import { ComponentProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import GridList from '@/components/common/list/Grid/Grid';
import { HeroSwiper } from '../Hero/HeroSwiper';
import { DistributionEntity } from '@/models/types/forge';
import { getFilteredItems } from '@/helpers/forgeDistributionEntityHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import MasonryMosaic from '@/components/common/MasonryMosaic/MasonryMosaic';

type ModuleProps = {
  moduleTitle?: string;
  headingLevel?: string;
  displayModuleTitle?: boolean;
  skip?: number;
  limit?: number;
  tags?: string;
  entityType?: string;
  selectionSlug?: string;
  layout?: string;
};

const renderList = (layout: string | undefined, items: DistributionEntity[] | null, limit: number | undefined) => {
  switch (layout) {
    case 'hero':
      return (
        <HeroSwiper
          slides={getFilteredItems(items, Number(limit ?? 5))}
          hideDate={true}
        />
      );
    case 'mosaic':
      return (
        <div className="flex px-8">
          <MasonryMosaic items={items}></MasonryMosaic>
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
          canRender={getBooleanProperty(displayModuleTitle)}
          heading={headingLevel}
          text={moduleTitle}
        ></ModuleTitle>
        {renderList(layout, items, limit)}
      </section>
    )
  );
};
export default EditorialList;
