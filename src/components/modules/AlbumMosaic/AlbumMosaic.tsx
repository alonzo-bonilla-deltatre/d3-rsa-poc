import { ComponentProps, EditorialListModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import MosaicView from '@/components/commons/MosaicView/MosaicView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type MosaicPhotosProps = {
  slug?: string;
} & EditorialListModuleProps;

const MosaicPhotos = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth } = data.properties as MosaicPhotosProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const albumEntity = await getEntity(ForgeDapiEntityCode.albums, slug, {
    hasLinkRules: true,
    variables: data.variables,
  });

  if (!albumEntity || !(albumEntity.elements?.length > 0)) {
    logger.log(`Cannot find entity with slug ${slug} or it's empty`, LoggerLevel.warning);
    return null;
  }

  let items: any[] = [];
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);
  items = items.concat(albumEntity.elements);

  return (
    <ModuleContainer>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-0.5 w-full mt-5 ">
        {/*<MosaicView items={albumEntity.elements} />*/}
        <MosaicView items={items} />
      </div>
    </ModuleContainer>
  );
};

export default MosaicPhotos;
