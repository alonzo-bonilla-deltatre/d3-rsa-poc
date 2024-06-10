import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity, Tag } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Picture from '@/components/commons/Picture/Picture';

type CardProps = {
  entity: DistributionEntity;
};

const StoryRelatedItemCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const description = getDescriptionField(entity);
  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-lg relative">
      {entity?.tags && entity?.tags.length > 0 && (
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
      <Typography
        variant={'body-l'}
        className="line-clamp-1 text-ellipsis uppercase"
      >
        {entity.title}
      </Typography>
      <Typography
        variant={'body-s'}
        className={'text-grey-100 line-clamp-2 text-ellipsis'}
      >
        {description}
      </Typography>
      <div className="overflow-hidden rounded-lg">
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
        />
      </div>
    </div>
  );
};

export default StoryRelatedItemCard;
