import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity, Tag } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Picture from '@/components/commons/Picture/Picture';
import Link from '@/components/commons/Link/Link';

type CardProps = {
  entity: DistributionEntity;
};

const StoryRelatedItemCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const description = getDescriptionField(entity);
  return (
    <Link
      href={entity.url}
      className="h-full w-full"
    >
      <div className="relative flex flex-col gap-2 overflow-hidden rounded-lg">
        {entity?.tags && entity?.tags.length > 0 && (
          <div className="flex flex-col gap-2">
            {entity?.tags.map((tag: Tag, index: number) => (
              <Typography
                variant="tag-l"
                key={index}
              >
                {tag.title}
              </Typography>
            ))}
          </div>
        )}
        <Typography
          variant="body-l"
          className="line-clamp-1 text-ellipsis uppercase"
        >
          {entity.title}
        </Typography>
        <Typography
          variant="body-s"
          className="line-clamp-2 text-ellipsis text-grey-100"
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
              'h-[revert-layer] w-auto rounded-lg object-[inherit]',
              hasValidUrl(entity?.url) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </div>
      </div>
    </Link>
  );
};

export default StoryRelatedItemCard;
