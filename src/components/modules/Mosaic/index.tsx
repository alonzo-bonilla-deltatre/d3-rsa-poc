import ModuleTitle from '@/components/common/ModuleTitle';
import MosaicContainer from '@/components/modules/Mosaic/MosaicContainer';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getAllEntities } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  entityType: string;
  skip: number;
  limit: number;
  tags: string;
};

const Mosaic = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, entityType, skip, limit, tags } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType.length) {
    logger.log('Cannot render TestMosaicList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const promoEntitiesFetch = getAllEntities(entityType, { skip, limit, tags });

  const [promos] = await Promise.all([promoEntitiesFetch]);
  const items = promos?.items;

  return items?.length ? (
    <>
      <section className="mt-8">
        <ModuleTitle
          canRender={/true/.test(displayModuleTitle)}
          heading={headingLevel}
          text={moduleTitle}
        ></ModuleTitle>
        <div className="flex px-8">
          <MosaicContainer items={items}></MosaicContainer>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};
export default Mosaic;
