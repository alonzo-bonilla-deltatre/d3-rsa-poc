import ModuleTitle from '@/components/common/ModuleTitle';
import { getEntitiesWithPlaceholder } from '@/helpers/distributionEntityListHelper';
import { ComponentProps } from '@/models/types/components';
import { getEntityList, getFilteredItems } from '@/services/dapiService';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import GridList from '@/components/common/list/Grid';
import { HeroSwiper } from '../Hero/HeroSwiper';
import { nanoid } from 'nanoid';
import MosaicContainer from '../Mosaic/MosaicContainer';
import { DistributionEntity } from '@/models/types/dapi';

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  skip: number;
  limit: number;
  tags: string;
  entityType: string;
  selectionSlug: string;
  layout: string;
};

const renderList = (layout: string, items: DistributionEntity[] | null) => {
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
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType.length) {
    logger.log('Cannot render TestList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const items = await getEntityList(selectionSlug, { skip, limit, tags }, entityType);
  const entitiesWithPlaceholder = getEntitiesWithPlaceholder(items ?? [], data.variables);

  return (
    entitiesWithPlaceholder?.length && (
      <section className="mt-8">
        <ModuleTitle
          canRender={/true/.test(displayModuleTitle)}
          heading={headingLevel}
          text={moduleTitle}
        ></ModuleTitle>
        {renderList(layout, entitiesWithPlaceholder)}
      </section>
    )
  );
};
export default EditorialList;
