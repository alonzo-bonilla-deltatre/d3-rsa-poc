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
      className={'w-full h-full'}
    >
      <div className="flex flex-col gap-2 relative">
        <div className="flex items-center justify-center overflow-hidden rounded-lg aspect-[16/9] min-w-[224px]">
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
              'block h-full w-full max-h-[208px] aspect-[16/9] min-w-[224px] object-fill object-center rounded-lg',
              hasValidUrl(entity?.url) ? 'hover:scale-110 transition duration-300 cursor-pointer' : ''
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </div>
        <Typography
          variant={'body-l'}
          className={'line-clamp-1 text-ellipsis uppercase'}
        >
          {entity.title}
        </Typography>
        <Typography
          variant={'body-s'}
          className={'text-grey-100 line-clamp-2 text-ellipsis'}
        >
          {description}
        </Typography>
      </div>
    </Link>
  );
};

export default SearchCard;
