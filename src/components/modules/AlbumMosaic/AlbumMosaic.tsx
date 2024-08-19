import { ComponentProps, ModuleProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/loggerUtility';
import MosaicView from '@/components/commons/MosaicView/MosaicView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography from '@/components/commons/Typography/Typography';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Date from '@/components/commons/Date/Date';
import { DateType } from '@/models/types/date';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

const AlbumMosaic = async ({ data }: { data: ComponentProps }) => {
  const { slug, isFullWidth } = data.properties as ModuleProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const albumEntity = await getEntity(ForgeDapiEntityCode.albums, slug, {
    hasLinkRules: true,
    variables: data.variables,
  });

  if (!albumEntity || !(albumEntity.elements?.length > 0)) {
    logger.log(`Cannot find ${ForgeDapiEntityCode.albums} entity with slug ${slug} or it's empty`, LoggerLevel.warning);
    return null;
  }

  const description = getDescriptionField(albumEntity);

  return (
    <ModuleContainer isFullWidth={getBooleanProperty(isFullWidth)}>
      <div className="flex flex-col gap-2 pb-10">
        <Typography variant={'h1'}>{albumEntity?.title}</Typography>
        {description && <Typography variant={'body-m'}>{description}</Typography>}
        <Typography
          variant={'tag-l'}
          as={'time'}
          className="text-grey-500 uppercase"
        >
          <Date
            date={albumEntity?.contentDate}
            dateType={DateType.standard}
          />
        </Typography>
      </div>
      <MosaicView items={albumEntity.elements} />
    </ModuleContainer>
  );
};

export default AlbumMosaic;
