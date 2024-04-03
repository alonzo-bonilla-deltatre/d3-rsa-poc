import Picture from '@/components/commons/Picture/Picture';
import { DistributionEntity, Tag as TagEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import Tag from '@/components/commons/Tag/Tag';
import { TagType } from '@/models/types/components/commons/tag';

type StoryHeaderProps = {
  storyEntity: DistributionEntity;
};

type StoryHeaderDefaultImage = {
  width: number;
  height: number;
  url: string;
};

const StoryHeader = ({ storyEntity }: StoryHeaderProps) => {
  const defaultThumbnail = {
    width: 300,
    height: 250,
    url: '/assets/default-thumbnail.jpg',
  } as StoryHeaderDefaultImage;

  return (
    <div className="container-full relative">
      {storyEntity?.thumbnail?.templateUrl ? (
        <figure className="cutter-story max-h-[calc(100vh - 180px)]">
          <Picture
            src={storyEntity.thumbnail?.templateUrl}
            transformations={transformations.story_header_background}
            alt={storyEntity.thumbnail?.title ?? ''}
            className="w-full h-full object-cover"
            imageStyle={{
              width: '100%',
              height: 'auto',
            }}
          />
        </figure>
      ) : (
        <figure className="cutter-story">
          <Picture
            width={defaultThumbnail.width}
            height={defaultThumbnail.height}
            alt="adv"
            className={`w-full h-full object-cover bg-black`}
            src={defaultThumbnail.url}
            imageStyle={{
              width: '100%',
              height: 'auto',
              maxHeight: 'calc(100vh - 180px)',
            }}
            priority={true}
          />
        </figure>
      )}
      {storyEntity.tags && storyEntity.tags.length > 0 && (
        <div className="lg:absolute bottom-0 right-0 w-full">
          <div className="relative container">
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:max-w-full mx-auto">
              {storyEntity?.relations && storyEntity?.relations.length > 0 && <div className="col-span-3" />}
              <div
                className={`${
                  storyEntity?.relations && storyEntity?.relations.length > 0 ? 'col-span-9' : 'col-start-3 col-end-11'
                }`}
              >
                <div className="bg-white ml-[-128px] pl-[128px] mr-[-100vw] pr-[100vw] pt-2 lg:pt-6">
                  {storyEntity.tags.map((tag: TagEntity, index: number) => (
                    <Tag
                      key={index}
                      text={tag.title}
                      style={TagType.Outline}
                      className="mb-2 lg:mb-6"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryHeader;
