import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import { formatDate } from '@/helpers/dateHelper';
import Link from '@/components/commons/Link/Link';

type CardProps = {
  entity: DistributionEntity;
};

const DefaultCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const description = entity?.fields?.description ? entity?.fields?.description : entity?.headline;
  return (
    <Link href={entity.url} className={'w-full h-full'}>
      <div className="flex rounded-lg relative">
        <figure className="bg-black overflow-hidden rounded-lg z-10">
          <Picture
            src={
              entity?.thumbnail?.templateUrl
                ? entity?.thumbnail?.templateUrl
                : entity?.image?.templateUrl
                  ? entity?.image?.templateUrl
                  : ''
            }
            transformations={transformations.thumbnail_square_detail}
            alt={entity.title}
            className={twMerge(
              'block h-full w-full object-cover object-center opacity-[.60] rounded-lg',
              hasValidUrl(entity?.url) ? 'hover:scale-110 transition duration-300 cursor-pointer' : '',
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </figure>
        <div className="flex flex-col absolute bottom-0 text-white gap-2 justify-end items-start p-6 z-10">
          <Typography
            variant={'body-l'}
            className={'line-clamp-2 text-ellipsis font-bold'}
          >
            {entity.title}
          </Typography>
          {description && (
            <Typography
              variant={'body-s'}
              className={'line-clamp-2 text-ellipsis text-grey-100'}
            >
              {description}
            </Typography>
          )}
          <Typography
            variant={'tag-m'}
          >
            {formatDate(entity?.contentDate, 'DD MMM, YYYY')}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default DefaultCard;
