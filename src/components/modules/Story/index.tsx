import { ComponentProps } from '@/models/types/components';
import { getEntity } from '@/services/dapiService';
import Picture from '@/components/common/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import Roofline from '@/components/common/Roofline';
import Author from '@/components/common/Author';
import Date from '@/components/common/Date';
import SocialIcons from '@/components/common/SocialIcons';
import { StoryPart } from '@/models/types/storyPart';
import { renderStoryPart } from '@/services/renderHandlers/renderStoryPart';
import Sponsored from '@/components/common/Sponsored';
import { getSingleAssetByTag } from '@/services/gadService';
import { nanoid } from 'nanoid';

type ModuleProps = {
  slug: string;
  hideAuthor: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  hideSocial: boolean;
  hideSponsor: boolean;
  sponsor: string;
  sponsorName: string;
};

const Story = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  if (!Object.hasOwn(props, 'slug') || !props.slug.length) {
    logger.log('Cannot render Story module with empty slug', LoggerLevel.warning);
    return null;
  }

  const storyEntityFetch = getEntity('stories', props.slug);

  const [storyEntity] = await Promise.all([storyEntityFetch]);
  const sponsor = await getSingleAssetByTag('sponsor-coates');
  //TODO: sponsor as a related tag?

  return storyEntity ? (
    <>
      <section className="w-full container mx-auto mt-40">
        <div className="flex justify-between mx-20">
          <header className="w-full">
            <Roofline
              className={'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit mb-2'}
              context={storyEntity.context}
              hide={props.hideRoofline}
            ></Roofline>
            <h3 className="font-bold text-5xl uppercase">{storyEntity.title}</h3>
            <div className="flex justify-between items-center mt-8">
              <div>
                {storyEntity.headline && <p className="mb-3">{storyEntity.headline}</p>}
                <Author
                  author={storyEntity.createdBy}
                  hide={props.hideAuthor}
                ></Author>
                <Date
                  date={storyEntity.contentDate}
                  format={null}
                  hide={props.hideDate}
                ></Date>
              </div>
              <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                <div>
                  {sponsor && (
                    <Sponsored
                      hide={false}
                      name={sponsor.name}
                      width={70}
                      height={20}
                      className={''}
                      assetUrl={sponsor.assetUrl}
                    ></Sponsored>
                  )}
                  {!props.hideSocial && (
                    <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                      <SocialIcons
                        hide={false}
                        size={50}
                        className={'mr-4 cursor-pointer hover:text-[#EE3123] transition duration-300'}
                      ></SocialIcons>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>
      <section className="w-full container mx-auto mt-20">
        {storyEntity.thumbnail && (
          <div className="mt-8 col-start-1">
            <Picture
              src={storyEntity.thumbnail.templateUrl}
              transformations={transformations.thumbnailDetail}
              alt={storyEntity.thumbnail.title ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {storyEntity.parts.map((part: StoryPart) => {
          return (
            <>
              <div
                key={nanoid()}
                className="mx-20 mt-20 col-start-1"
              >
                {renderStoryPart(part)}
              </div>
            </>
          );
        })}
      </section>
    </>
  ) : (
    <div />
  );
};
export default Story;
