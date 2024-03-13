import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { notFound } from 'next/navigation';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { formatDate } from '@/utilities/dateFormatter';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import DivaVideoPlayer from '@/components/common/DivaVideoPlayer/DivaVideoPlayer';

type DivaVideoProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
} & ModuleProps;

const DivaVideo = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth, isDark } = data.properties as DivaVideoProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const videoEntity = await getEntity(ForgeDapiEntityCode.divaVideos, slug, {
    variables: data.variables,
  });

  if (videoEntity == null) {
    logger.log(`Cannot find album divavideos with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }
  const description = videoEntity?.fields?.description ?? '';

  return (
    <SectionWithHeader
      data={{
        headerTitle: videoEntity?.title,
        headerTitleHeadingLevel: 'h2',
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-brightcove ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        additionalChildren: (
          <div className="flex flex-col gap-2 ">
            {description && <p className="d3-ty-body-medium">{description}</p>}
            <time className="d3-ty-tag-large text-gray-400 uppercase">
              {formatDate(videoEntity?.contentDate, 'DD MMMM YYYY')}
            </time>
          </div>
        ),
        children: <DivaVideoPlayer videoEntity={videoEntity} />,
      }}
    />
  );
};

export default DivaVideo;
