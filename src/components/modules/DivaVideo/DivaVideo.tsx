import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { notFound } from 'next/navigation';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import DivaVideoPlayer from '@/components/commons/DivaVideoPlayer/DivaVideoPlayer';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';
import logger from '@/utilities/loggerUtility';
import { formatDate } from '@/helpers/dateHelper';

type DivaVideoProps = {
  slug?: string;
} & ModuleProps;

const DivaVideo = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth } = data.properties as DivaVideoProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const entity = await getEntity(ForgeDapiEntityCode.divaVideos, slug, {
    variables: data.variables,
  });

  if (entity == null) {
    logger.log(`Cannot find album divavideos with slug ${slug} `, LoggerLevel.warning);
    notFound();
  }

  const description = entity?.fields?.description ?? '';

  return (
    <ModuleContainer>
      <div className="flex flex-col gap-2 pb-10">
        <Typography variant={'h1'}>{entity?.title}</Typography>
        {description && <Typography variant={'body-m'}>{description}</Typography>}
        <Typography
          variant={'tag-l'}
          as={'time'}
          className="text-grey-500 uppercase"
        >
          {formatDate(entity?.contentDate, 'DD MMMM YYYY')}
        </Typography>
      </div>
      <DivaVideoPlayer entity={entity} />
    </ModuleContainer>
  );
};

export default DivaVideo;
