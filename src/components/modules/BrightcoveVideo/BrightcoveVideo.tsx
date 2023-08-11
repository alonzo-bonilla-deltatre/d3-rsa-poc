import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer/BrightcoveVideoPlayer';
import SocialIcons from '@/components/common/SocialIcons/SocialIcons';
import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { formatDate } from '@/utilities/dateFormatter';
import logger from '@/utilities/logger';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { overrideVideoMetadata } from '@/helpers/metadataHelper';
import { metadata as parentMetadata } from '@/app/[[...pageName]]/page';
import { notFound } from 'next/navigation';

type ModuleProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
};

const BrightcoveVideo = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    const invalidSlugErrorMessage = 'Cannot render BrightcoveVideo module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }

  const entity = await getEntity('brightcovevideos', properties.slug);

  if (entity == null) {
    logger.log(`Cannot find album brightcovevideos with slug ${properties.slug} `, LoggerLevel.warning);
    notFound();
  }

  // Override parent metadata
  if (getBooleanProperty(properties.preventSettingMetadata)) {
    overrideVideoMetadata(parentMetadata, entity);
  }

  const description = entity?.fields['description'] as string;

  return entity ? (
    <>
      <section className="w-full container mx-auto mt-40">
        <div className="flex justify-between mx-20">
          <header className="w-full">
            <h3 className="font-bold text-5xl uppercase">{entity.title}</h3>
            <div className="flex justify-between items-center mt-8">
              <div>
                {description && <p className="mb-3">{description}</p>}
                <div className="mb-3 text-sm font-light text-[#BEBEBE]">{entity.createdBy}</div>
                <time className="mb-3 text-sm font-light text-[#BEBEBE]">{formatDate(entity.contentDate)}</time>
              </div>
              <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                <SocialIcons
                  hide={false}
                  size={50}
                  className={'mr-4 cursor-pointer hover:text-[#EE3123] transition duration-300'}
                ></SocialIcons>
              </div>
            </div>
          </header>
        </div>
        <div className="mt-20">
          <BrightcoveVideoPlayer
            entity={entity}
            isStoryPart={false}
          />
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};

export default BrightcoveVideo;
