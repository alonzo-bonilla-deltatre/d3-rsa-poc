import BrightcoveVideoPlayer from '@/components/commons/BrightcoveVideoPlayer/BrightcoveVideoPlayer';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { formatDate } from '@/helpers/dateHelper';
import logger from '@/utilities/loggerUtility';
import { notFound } from 'next/navigation';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';

type BrightcoveVideoProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
} & ModuleProps;

const BrightcoveVideo = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth } = data.properties as BrightcoveVideoProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const entity = await getEntity(ForgeDapiEntityCode.brightcoveVideos, slug, {
    variables: data.variables,
  });

  if (entity == null) {
    logger.log(`Cannot find album brightcovevideos with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }
  const description = entity?.fields?.description ?? '';

  return (
    <ModuleContainer>
      <div className="flex flex-col gap-2 pb-10">
        <Typography variant={'h1'}>{entity?.title}</Typography>
        {description && <Typography variant={'body-m'}>{description}</Typography>}
        <Typography variant={'tag-l'} as={'time'} className="text-grey-500 uppercase">
          {formatDate(entity?.contentDate, 'DD MMMM YYYY')}
        </Typography>
      </div>
      <BrightcoveVideoPlayer
        entity={entity} />
    </ModuleContainer>
  );
};

export default BrightcoveVideo;
