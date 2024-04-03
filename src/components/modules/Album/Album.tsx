import { ComponentProps, ModuleProps } from '@/models/types/components';
import { AlbumEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import { notFound } from 'next/navigation';
import AlbumFeatured from '@/components/modules/Album/AlbumFeatured';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

type AlbumProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
} & ModuleProps;

const Album = async ({ data }: { data: ComponentProps }) => {
  const props = data.properties as AlbumProps;
  if (moduleIsNotValid(data, ['slug'])) return null;

  const albumEntity = await getEntity(ForgeDapiEntityCode.albums, props.slug, {
    hasLinkRulesForRelationsAndParts: true,
    hasThumbnailPlaceholder: true,
    variables: data.variables,
  });

  if (albumEntity == null) {
    logger.log(`Cannot find album entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  return (
    <AlbumFeatured
      albumEntity={albumEntity as AlbumEntity}
      headerTitle={props.headerTitle}
      headerTitleHeadingLevel={props.headerTitleHeadingLevel}
      hideHeaderTitle={props.hideHeaderTitle}
      className={getDarkClass(props.isDark)}
    ></AlbumFeatured>
  );
};
export default Album;
