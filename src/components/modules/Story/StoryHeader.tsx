import Author from '@/components/common/Author';
import Roofline from '@/components/common/Roofline';
import Date from '@/components/common/Date';
import { DistributionEntity } from '@/models/types/forge';
import SocialIcons from '@/components/common/SocialIcons';
import Picture from '@/components/common/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';

type ModuleProps = {
  storyEntity: DistributionEntity;
  hideAuthor: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  hideSocial: boolean;
  hideRelatedItems: boolean;
};
const StoryHeader = ({ ...props }: ModuleProps) => {
  const storyEntity = props.storyEntity;
  return (
    <>
      <section className="w-full container mx-auto">
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
                  hide={props.hideDate}
                ></Date>
              </div>
              <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                <div>
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
      </section>
    </>
  );
};

export default StoryHeader;
