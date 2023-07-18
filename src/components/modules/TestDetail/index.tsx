import ModuleTitle from '@/components/common/ModuleTitle';
import Picture from '@/components/common/Picture';
import Sponsored from '@/components/common/Sponsored';
import { ComponentProps } from '@/models/types/components';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { getAssetsByTag, getSingleAssetByTag } from '@/services/gadService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { IMAGE_PLACEHOLDER } from '@/utilities/consts';
import logger from '@/utilities/logger';

type ModuleProps = {
  entityType?: string;
  slug?: string;
  moduleTitle?: string;
  headingLevel?: string;
  displayModuleTitle?: string;
};

const TestDetail = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'entityType') || !properties.entityType?.length) {
    logger.log('Cannot render TestDetail module with empty entityType', LoggerLevel.warning);
    return null;
  }
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    logger.log('Cannot render TestDetail module with empty slug', LoggerLevel.warning);
    return null;
  }

  const sponsorFetch = getSingleAssetByTag('sponsor-coates');
  const gadThumbnailPlaceHolderAssetsFetch = getAssetsByTag(IMAGE_PLACEHOLDER);

  const [sponsor, gadThumbnailPlaceHolderAssets] = await Promise.all([
    sponsorFetch,
    gadThumbnailPlaceHolderAssetsFetch,
  ]);

  const thumbnailPlaceHolder: GraphicAssetsDashboardItem | null = gadThumbnailPlaceHolderAssets?.length
    ? gadThumbnailPlaceHolderAssets[0]
    : null;

  const testDetailEntity = await getEntity(properties.entityType, properties.slug);

  return testDetailEntity ? (
    <>
      <section className="mt-8">
        <ModuleTitle
          canRender={
            properties.displayModuleTitle !== undefined && properties.displayModuleTitle?.toString() === 'true'
          }
          heading={properties.headingLevel}
          text={properties.moduleTitle}
        ></ModuleTitle>
        <div className="grid grid-cols-1 max-h-[790px] min-h-[500px] bg-gray-700 w-full overflow-hidden">
          <div className="col-start-1 row-start-1 bg-black">
            {testDetailEntity.thumbnail ? (
              <Picture
                src={testDetailEntity.thumbnail.templateUrl}
                transformations={transformations.thumbnailDetail}
                alt={testDetailEntity.thumbnail.title ?? ''}
                className="w-full h-full object-cover opacity-[.50]"
              />
            ) : (
              <Picture
                src={thumbnailPlaceHolder?.assetUrl ?? ''}
                transformations={transformations.thumbnailDetail}
                alt={thumbnailPlaceHolder?.publicId ?? ''}
                className="w-full h-full object-cover opacity-[.50]"
              />
            )}
          </div>
          <div className="mt-20 mx-40 col-start-1 row-start-1 z-10">
            <div className="flex justify-between">
              <div>
                <header className="max-w-md">
                  <h3 className="font-bold text-4xl uppercase">{testDetailEntity.title}</h3>
                </header>
              </div>

              {sponsor && (
                <div>
                  <Sponsored
                    hide={false}
                    name={sponsor.name}
                    width={70}
                    height={20}
                    assetUrl={sponsor.assetUrl}
                  ></Sponsored>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};
export default TestDetail;
