import ModuleTitle from '@/components/common/ModuleTitle';
import Picture from '@/components/common/Picture';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { LoggerLevel } from '@/models/types/logger';
import { getAllEntities } from '@/services/forgeDistributionService';
import { getAssetsByTag } from '@/services/gadService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import { formatDate } from '@/utilities/dateFormatter';
import logger from '@/utilities/logger';
import { nanoid } from 'nanoid';

type ModuleProps = {
  moduleTitle?: string;
  headingLevel?: string;
  displayModuleTitle?: string;
  entityType?: string;
  skip?: number;
  limit?: number;
  tags?: string;
};

type QueryStringModuleProps = {
  skip: number;
  limit: number;
  tags: string;
};

const TestList = async ({ ...data }: ComponentProps) => {
  const { moduleTitle, headingLevel, displayModuleTitle, entityType, skip, limit, tags } =
    data.properties as ModuleProps;
  if (!Object.hasOwn(data.properties, 'entityType') || !entityType?.length) {
    logger.log('Cannot render TestList module with empty entityType', LoggerLevel.warning);
    return null;
  }

  const promoEntitiesFetch = getAllEntities(entityType, { skip, limit, tags, variables: data.variables });
  const gadAssetsPlaceHolderFetch = getAssetsByTag(IMAGE_PLACEHOLDER);

  const [promos, gadThumbnailPlaceHolderAssets] = await Promise.all([promoEntitiesFetch, gadAssetsPlaceHolderFetch]);
  const items = promos?.items;

  const thumbnailPlaceHolder: GraphicAssetsDashboardItem | null = gadThumbnailPlaceHolderAssets?.length
    ? gadThumbnailPlaceHolderAssets[0]
    : null;

  return items?.length ? (
    <section className="mt-8">
      <ModuleTitle
        canRender={displayModuleTitle?.toString() === 'true'}
        heading={headingLevel}
        text={moduleTitle}
      ></ModuleTitle>
      <div className="grid grid-cols-3 gap-4 px-8">
        {items.map((entity: DistributionEntity) => {
          return (
            <div key={nanoid()}>
              {entity.thumbnail ? (
                <figure className="col-start-1 row-start-1">
                  <Picture
                    className="w-full h-full object-cover"
                    src={entity.thumbnail.templateUrl}
                    transformations={transformations.thumbnailGridItem}
                    alt={entity.thumbnail.title ?? ''}
                  />
                </figure>
              ) : (
                <figure className="col-start-1 row-start-1">
                  <Picture
                    className="w-full h-full object-cover"
                    src={thumbnailPlaceHolder?.assetUrl ?? ''}
                    transformations={transformations.thumbnailGridItem}
                    alt={thumbnailPlaceHolder?.publicId ?? ''}
                  />
                </figure>
              )}

              <div className="py-5 w-4/6">
                {entity.tags && (
                  <div className="flex">
                    {entity.tags.map((tag) => {
                      return (
                        <span
                          key={nanoid()}
                          className="uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit"
                        >
                          {tag.title}
                        </span>
                      );
                    })}
                  </div>
                )}
                <h3 className="my-2 mt-4 text-xl font-bold tracking-tight dark:text-white">{entity.title}</h3>
                <time className="mb-3 text-sm font-light text-[#BEBEBE]">{formatDate(entity.contentDate)}</time>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  ) : (
    <div />
  );
};
export default TestList;
