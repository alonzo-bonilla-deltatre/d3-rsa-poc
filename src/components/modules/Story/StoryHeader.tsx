import Author from '@/components/common/Author/Author';
import Date from '@/components/common/Date/Date';
import Picture from '@/components/common/Picture/Picture';
import Roofline from '@/components/common/Roofline/Roofline';
import SocialIcons from '@/components/common/SocialIcons/SocialIcons';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { Variable } from '@/models/types/pageStructure';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideDescription?: boolean;
  hideRoofline?: boolean;
  hideTitle?: boolean;
  hideSocial?: boolean;
  hideRelatedItems?: boolean;
  variables?: Variable[];
  storyEntity: DistributionEntity;
};

const StoryHeader = ({ ...props }: ModuleProps) => {
  return (
    <>
      <section className="w-full container mx-auto">
        <div className="flex justify-between mx-20">
          <header className="w-full">
            <Roofline
              className={'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit mb-2'}
              context={props.storyEntity?.context}
              hide={getBooleanProperty(props.hideRoofline)}
            ></Roofline>
            {!getBooleanProperty(props.hideTitle) && props.storyEntity?.title && (
              <h3 className="font-bold text-5xl uppercase">{props.storyEntity.title}</h3>
            )}
            <div className="flex justify-between items-center mt-8">
              <div>
                {!getBooleanProperty(props.hideTitle) && props.storyEntity?.headline && (
                  <p className="mb-3">{props.storyEntity.headline}</p>
                )}
                <Author
                  author={props.storyEntity?.createdBy}
                  hide={getBooleanProperty(props.hideAuthor)}
                ></Author>
                <Date
                  date={props.storyEntity?.contentDate}
                  hide={getBooleanProperty(props.hideDate)}
                ></Date>
              </div>
              <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                <div>
                  {!getBooleanProperty(props.hideSocial) && (
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
        {props.storyEntity?.thumbnail && (
          <div className="mt-8 col-start-1">
            <Picture
              src={props.storyEntity.thumbnail?.templateUrl}
              transformations={transformations.thumbnailDetail}
              alt={props.storyEntity.thumbnail?.title ?? ''}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </section>
    </>
  );
};

export default StoryHeader;
