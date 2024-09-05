import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import { renderSvgIcon } from '@/components/icons';
import { formatDate } from '@/helpers/dateHelper';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import Link from '@/components/commons/Link/Link';
import Picture from '@/components/commons/Picture/Picture';

type CardProps = {
  entity: DistributionEntity;
};

const EventCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const dateFromDay = formatDate(getStringProperty(entity.fields?.dateFrom), 'DD');
  const dateFromMonth = formatDate(getStringProperty(entity.fields?.dateFrom), 'MMM');
  const hasTicket = !!(entity.fields?.tickets?.url && entity.fields?.tickets?.displayText);
  return (
    <Link
      href={entity.url}
      className="h-full w-full"
    >
      <div className="relative rounded-lg">
        <div className="absolute z-10 h-[234px] w-full rounded-lg bg-event-mask bg-bottom px-6 pt-24">
          <div className="center absolute top-0 z-10 flex h-[82px] w-[64px] flex-col justify-items-center bg-event-date ltr:left-2 ltr:lg:left-4 rtl:right-2 rtl:lg:right-4">
            <Typography
              variant="caption-l"
              className="text-center"
            >
              {dateFromDay}
            </Typography>
            <Typography
              variant="caption-s"
              className="-mt-1 text-center uppercase"
            >
              {dateFromMonth}
            </Typography>
          </div>
          <div className="absolute top-2 z-10 flex items-center gap-2 rounded-full bg-grey-500 p-2 py-4 text-white lg:top-3 lg:px-4 lg:py-2 ltr:right-2 ltr:lg:right-3 rtl:left-2 rtl:lg:left-3">
            {renderSvgIcon('Event', {
              className: 'w-5 h-5',
              width: 20,
              height: 20,
            })}
          </div>
          <Typography
            variant="h3"
            className="mb-2 mt-1 line-clamp-2 uppercase text-white lg:mt-3"
          >
            {entity.title}
          </Typography>
        </div>
        {hasTicket && (
          <Typography
            variant="tag-m"
            className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-white p-2 text-black lg:bottom-3 lg:px-4 lg:py-2"
          >
            <span>{entity.fields?.tickets?.displayText}</span>
          </Typography>
        )}
        <figure className="overflow-hidden rounded-lg pt-48">
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
              'block h-full w-full rounded-lg object-cover object-center',
              hasValidUrl(entity?.url) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </figure>
      </div>
    </Link>
  );
};

export default EventCard;
