import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer/BrightcoveVideoPlayer';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { formatDate } from '@/utilities/dateFormatter';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import { ForgeDapiEntityCode } from '@/models/types/forge';

type BrightcoveVideoProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
} & ModuleProps;

const BrightcoveVideo = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth, isDark } = data.properties as BrightcoveVideoProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const entity = await getEntity(ForgeDapiEntityCode.brightcoveVideos, slug, {
    variables: data.variables,
  });

  if (entity == null) {
    logger.log(`Cannot find album brightcovevideos with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }
  const description = entity?.fields['description'] as string;

  return (
    <SectionWithHeader
      data={{
        headerTitle: entity?.title,
        headerTitleHeadingLevel: 'h2',
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-brightcove ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        additionalChildren: (
          <div className="flex flex-col gap-2 ">
            {description && <p className="d3-ty-body-medium">{description}</p>}
            <time className="d3-ty-tag-large text-gray-400 uppercase">
              {formatDate(entity?.contentDate, 'DD MMMM YYYY')}
            </time>
          </div>
        ),
        children: (
          <BrightcoveVideoPlayer
            entity={entity}
            isStoryPart={false}
          />
        ),
      }}
    />
  );
};

export default BrightcoveVideo;
