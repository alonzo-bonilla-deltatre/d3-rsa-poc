import ModuleTitle from '@/components/common/ModuleTitle/ModuleTitle';
import MasonryMosaic from '@/components/common/MasonryMosaic/MasonryMosaic';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getAllEntities } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  moduleTitle?: string;
  headingLevel?: string;
  displayModuleTitle?: boolean;
  entityType?: string;
  skip?: number;
  limit?: number;
  tags?: string;
};

const Mosaic = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, entityType, skip, limit, tags } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType?.length) {
    logger.log('Cannot render TestMosaicList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const promoEntitiesFetch = getAllEntities(entityType, { skip, limit, tags, variables: data.variables });

  const [promos] = await Promise.all([promoEntitiesFetch]);
  const items = promos?.items;

  return items?.length ? (
    <>
      <section className="mt-8">
        <ModuleTitle
          canRender={getBooleanProperty(displayModuleTitle)}
          heading={headingLevel}
          text={moduleTitle}
        ></ModuleTitle>
        <div className="flex px-8">
          <MasonryMosaic items={items}></MasonryMosaic>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};
export default Mosaic;
