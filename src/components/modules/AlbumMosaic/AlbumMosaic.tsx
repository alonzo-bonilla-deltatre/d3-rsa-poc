import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import MosaicView from '@/components/commons/MosaicView/MosaicView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import { parseFieldValue } from '@/utilities/fieldValueParserUtility';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';

type MosaicPhotosProps = {
  slug?: string;
} & EditorialModuleProps;

const MosaicPhotos = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth, isDark, ctaTitle, ctaLink } = data.properties as MosaicPhotosProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const albumEntity = await getEntity(ForgeDapiEntityCode.albums, slug, {
    hasLinkRules: true,
    variables: data.variables,
  });

  if (!albumEntity || !(albumEntity.elements?.length > 0)) {
    logger.log(`Cannot find entity with slug ${slug} or it's empty`, LoggerLevel.warning);
    return null;
  }

  return (
    <SectionWithHeader
      data={{
        headerTitle: albumEntity.title,
        ctaLink: parseFieldValue(ctaLink, data.variables),
        ctaTitle: ctaTitle,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-album-list ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-0.5 w-full mt-5 ">
            <MosaicView items={albumEntity.elements} />
          </div>
        ),
      }}
    />
  );
};

export default MosaicPhotos;
