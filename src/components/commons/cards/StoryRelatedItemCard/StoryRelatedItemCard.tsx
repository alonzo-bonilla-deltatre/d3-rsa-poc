import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity, Tag } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';

type StoryRelatedItemCardProps = {
  entity: DistributionEntity;
};

const StoryRelatedItemCard = ({ entity }: StoryRelatedItemCardProps) => {
  if (!entity) return null;
  const description = entity?.fields?.description ? entity?.fields?.description : entity?.headline;
  return (
    <>
      {entity?.tags && (
        <div className={'flex flex-col gap-2'}>
          {entity?.tags.map((tag: Tag, index: number) => (
            <Typography
              variant={'tag-l'}
              key={index}
            >
              {tag.title}
            </Typography>
          ))}
        </div>
      )}
      <Typography variant={'body-l'}>{entity.title}</Typography>
      <Typography
        variant={'body-s'}
        className={'text-gray-500'}
      >
        {description}
      </Typography>
      <Picture
        src={
          entity?.thumbnail?.templateUrl
            ? entity?.thumbnail?.templateUrl
            : entity?.image?.templateUrl
              ? entity?.image?.templateUrl
              : ''
        }
        transformations={transformations.thumbnail_landscape_detail}
        alt={entity.title}
        className={twMerge(
          'w-auto h-[revert-layer] object-[inherit] rounded-lg',
          hasValidUrl(entity?.url) ? 'hover:scale-110 transition duration-300 cursor-pointer' : ''
        )}
        format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
        figureClassName={'overflow-hidden rounded-lg'}
      />
    </>
  );
};

export default StoryRelatedItemCard;
