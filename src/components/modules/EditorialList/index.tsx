import Card from '@/components/common/Card';
import ModuleTitle from '@/components/common/ModuleTitle';
import { getEntitiesWithPlaceholder } from '@/helpers/distributionEntityListHelper';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/dapi';
import { LoggerLevel } from '@/models/types/logger';
import { getEntityList } from '@/services/dapiService';
import logger from '@/utilities/logger';
import { nanoid } from 'nanoid';

type ModuleProps = {
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  skip: number;
  limit: number;
  tags: string;
  entityType: string;
  selectionSlug: string;
};

const EditorialList = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, skip, limit, tags, selectionSlug, entityType } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType.length) {
    logger.log('Cannot render TestList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const items = await getEntityList(selectionSlug, { skip, limit, tags }, entityType);

  const entitiesWithPlaceholder = getEntitiesWithPlaceholder(items ?? [], data.variables);

  return entitiesWithPlaceholder?.length ? (
    <section className="mt-8">
      <ModuleTitle
        canRender={/true/.test(displayModuleTitle)}
        heading={headingLevel}
        text={moduleTitle}
      />
      <div className="grid grid-cols-3 gap-4 px-8">
        {entitiesWithPlaceholder?.map((entity: DistributionEntity) => (
          <Card
            key={nanoid()}
            entity={entity}
            options={{
              hideIcon: true,
              hideRoofline: false,
              hideTitle: false,
              hideDate: false,
              hideAuthor: true,
              hideCta: true,
            }}
          />
        ))}
      </div>
    </section>
  ) : (
    <div />
  );
};
export default EditorialList;
