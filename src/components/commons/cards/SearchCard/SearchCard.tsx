import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import Link from '@/components/commons/Link/Link';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Picture from '@/components/commons/Picture/Picture';

type CardProps = {
  entity: DistributionEntity;
};

const SearchCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const description = getDescriptionField(entity);
  return (
    <Link
      href={entity.url}
      className="h-full w-full"
    >
      <div className="relative flex flex-col gap-2">
        <div className="flex aspect-[16/9] min-w-[224px] items-center justify-center overflow-hidden rounded-lg">
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
              'block aspect-[16/9] h-full max-h-[208px] w-full min-w-[224px] rounded-lg object-fill object-center',
              hasValidUrl(entity?.url) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </div>
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
      </div>
    </Link>
  );
};

export default SearchCard;
