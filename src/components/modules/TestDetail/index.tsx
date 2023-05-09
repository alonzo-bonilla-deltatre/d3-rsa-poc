import { ComponentProps } from '@/models/types/components';
import { getEntity } from '@/services/dapiService';
import Picture from '@/components/common/Picture';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { getAssetsByTag, getSingleAssetByTag } from '@/services/gadService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import Sponsored from '@/components/common/Sponsored';
import ModuleTitle from '@/components/common/ModuleTitle';

type ModuleProps = {
  entityType: string;
  slug: string;
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
};

const TestDetail = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'entityType') || !properties.entityType.length) {
    logger.log('Cannot render TestDetail module with empty entityType', LoggerLevel.warning);
    return null;
  }
  if (!Object.hasOwn(properties, 'slug') || !properties.slug.length) {
    logger.log('Cannot render TestDetail module with empty slug', LoggerLevel.warning);
    return null;
  }

  const sponsor = await getSingleAssetByTag('sponsor-coates');
  const gadAssetsPlaceHolderFetch = getAssetsByTag('react-poc-placeholder');

  const [gadThumbnailPlaceHolderAssets] = await Promise.all([gadAssetsPlaceHolderFetch]);
  const thumbnailPlaceHolder: GraphicAssetsDashboardItem | null = gadThumbnailPlaceHolderAssets?.length
    ? gadThumbnailPlaceHolderAssets[0]
    : null;

  const TestDetailEntityFetch = getEntity(properties.entityType, properties.slug);

  const [testDetailEntity] = await Promise.all([TestDetailEntityFetch]);

  return testDetailEntity ? (
    <>
      <section className="mt-8">
        <ModuleTitle
          canRender={/true/.test(properties.displayModuleTitle)}
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
