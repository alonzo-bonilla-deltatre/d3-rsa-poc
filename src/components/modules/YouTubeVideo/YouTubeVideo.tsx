import YouTubeVideoPlayer from '@/components/commons/YouTubeVideoPlayer/YouTubeVideoPlayer';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import { notFound } from 'next/navigation';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Date from '@/components/commons/Date/Date';
import { DateType } from '@/models/types/date';

const YouTubeVideo = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth } = data.properties as ModuleProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const entity = await getEntity(ForgeDapiEntityCode.youTubeVideos, slug, {
    variables: data.variables,
  });

  if (entity == null) {
    logger.log(`Cannot find ${ForgeDapiEntityCode.youTubeVideos} entity with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }
  const description = getDescriptionField(entity);

  return (
    <ModuleContainer isFullWidth={getBooleanProperty(isFullWidth)}>
      <div className="flex flex-col gap-2 pb-10">
        <Typography variant="h1">{entity?.title}</Typography>
        {description && <Typography variant="body-m">{description}</Typography>}
        <Typography
          variant="tag-l"
          as="time"
          className="text-grey-500 uppercase"
        >
          <Date
            date={entity?.contentDate}
            dateType={DateType.standard}
          />
        </Typography>
      </div>
      <YouTubeVideoPlayer entity={entity} />
    </ModuleContainer>
  );
};

export default YouTubeVideo;
