import { ComponentProps } from '@/models/types/components';
import { AlbumEntity } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import { metadata as parentMetadata } from 'src/app/[[...pageName]]/page';
import AlbumFeatured from '@/components/modules/Album/AlbumFeatured';
import { overrideAlbumMetadata } from '@/helpers/metadataHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
};

const Album = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  const invalidSlugErrorMessage = 'Cannot render Album module with empty slug';
  if (!Object.hasOwn(props, 'slug') || !props.slug?.length) {
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }

  const albumEntity = await getEntity('albums', props.slug, {
    hasLinkRulesForRelationsAndParts: true,
    hasThumbnailPlaceholder: true,
    variables: data.variables,
  });

  if (albumEntity == null) {
    logger.log(`Cannot find album entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  // Override parent metadata
  if (getBooleanProperty(props.preventSettingMetadata)) {
    overrideAlbumMetadata(parentMetadata, albumEntity);
  }

  return (
    <>
      <AlbumFeatured
        albumEntity={albumEntity as AlbumEntity}
        {...props}
      ></AlbumFeatured>
    </>
  );
};
export default Album;
