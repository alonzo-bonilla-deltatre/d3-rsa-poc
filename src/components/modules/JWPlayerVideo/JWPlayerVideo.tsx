import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import { notFound } from 'next/navigation';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';
import JWPlayerVideoPlayer from '@/components/commons/JWPlayerVideoPlayer/JWPlayerVideoPlayer';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Date from '@/components/commons/Date/Date';
import { DateType } from '@/models/types/date';

const JWPlayerVideo = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth } = data.properties as ModuleProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const entity = await getEntity(ForgeDapiEntityCode.jwPlayerVideos, slug, {
    variables: data.variables,
  });

  if (entity == null) {
    logger.log(`Cannot find ${ForgeDapiEntityCode.jwPlayerVideos} entity with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }
  const description = getDescriptionField(entity);

  return (
    <ModuleContainer isFullWidth={isFullWidth}>
      <div className="flex flex-col gap-2 pb-10">
        <Typography variant={'h1'}>{entity?.title}</Typography>
        {description && <Typography variant={'body-m'}>{description}</Typography>}
        <Typography
          variant={'tag-l'}
          as={'time'}
          className="text-grey-500 uppercase"
        >
          <Date
            date={entity?.contentDate}
            dateType={DateType.standard}
          />
        </Typography>
      </div>
      <JWPlayerVideoPlayer entity={entity} />
    </ModuleContainer>
  );
};

export default JWPlayerVideo;
