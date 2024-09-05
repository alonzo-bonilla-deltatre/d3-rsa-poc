import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import Link from '@/components/commons/Link/Link';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Picture from '@/components/commons/Picture/Picture';
import Date from '@/components/commons/Date/Date';
import { DateType } from '@/models/types/date';
import { getImageTemplateUrl } from '@/utilities/imageEntityUtility';

type CardProps = {
  entity: DistributionEntity;
};

const DefaultCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const description = getDescriptionField(entity);
  const templateUrl = getImageTemplateUrl(entity);

  return (
    <Link
      href={entity.url}
      className="h-full w-full"
    >
      <div className="relative flex aspect-[1/1] h-full w-full rounded-lg">
        {templateUrl && (
          <figure className="z-10 overflow-hidden rounded-lg bg-black">
            <Picture
              src={templateUrl}
              transformations={transformations.thumbnail_square_detail}
              alt={entity.title}
              className={twMerge(
                'block h-full w-full rounded-lg object-cover object-center opacity-[.60]',
                hasValidUrl(entity?.url) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
              )}
              format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
            />
          </figure>
        )}
        <div className="absolute bottom-0 z-10 flex flex-col items-start justify-end gap-2 p-2 text-white lg:p-6">
          <Typography
            variant="body-l"
            className="line-clamp-2 text-ellipsis font-bold"
          >
            {entity.title}
          </Typography>
          {description && (
            <Typography
              variant="body-s"
              className="line-clamp-2 text-ellipsis text-grey-100"
            >
              {description}
            </Typography>
          )}
          <Typography variant="tag-m">
            <Date
              date={entity?.contentDate}
              dateType={DateType.short}
            />
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default DefaultCard;
