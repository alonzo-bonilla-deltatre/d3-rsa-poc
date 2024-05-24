import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';

type SearchCardProps = {
  entity: DistributionEntity;
};

const SearchCard = ({ entity }: SearchCardProps) => {
  if (!entity) return null;
  const description = entity?.fields?.description ? entity?.fields?.description : entity?.headline;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center overflow-hidden rounded-lg">
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
      <Typography
        variant={'body-l'}
        className={'line-clamp-1 text-ellipsis uppercase'}
      >
        {entity.title}
      </Typography>
      <Typography
        variant={'body-s'}
        className={'text-gray-500 line-clamp-2 text-ellipsis'}
      >
        {description}
      </Typography>
    </div>
  );
};

export default SearchCard;
