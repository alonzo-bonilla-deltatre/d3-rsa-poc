import BrightcoveVideoPlayer from '@/components/common/BrightcoveVideoPlayer';
import ModuleTitle from '@/components/common/ModuleTitle';
import SocialIcons from '@/components/common/SocialIcons';
import { ComponentProps } from '@/models/types/components';
import { DistributionEntity } from '@/models/types/forge';
import { LoggerLevel } from '@/models/types/logger';
import { getEntity } from '@/services/forgeDistributionService';
import { formatDate } from '@/utilities/dateFormatter';
import { parseFieldValue } from '@/utilities/fieldValueParser';
import logger from '@/utilities/logger';

type ModuleProps = {
  slug: string;
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
  entity: DistributionEntity | null;
};

const BrightcoveVideo = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug.length) {
    logger.log('Cannot render CustomPromo module with empty slug', LoggerLevel.warning);
    return null;
  }

  const entity = await getEntity('brightcovevideos', properties.slug);

  const description = entity?.fields['description'] as string;

  return entity ? (
    <>
      <section className="w-full container mx-auto mt-40">
        <ModuleTitle
          canRender={/true/.test(properties.displayModuleTitle)}
          heading={properties.headingLevel}
          text={parseFieldValue(properties.moduleTitle, data.variables)}
        ></ModuleTitle>
        <div className="flex justify-between mx-20">
          <header className="w-full">
            {/false/.test(properties.displayModuleTitle) && (
              <h3 className="font-bold text-5xl uppercase">{entity.title}</h3>
            )}
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
