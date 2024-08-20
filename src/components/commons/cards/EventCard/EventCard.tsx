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
      className="w-full h-full"
    >
      <div className="relative rounded-lg">
        <div className="absolute rounded-lg bg-event-mask bg-bottom w-full h-[234px] px-6 pt-24 z-10">
          <div className="flex flex-col justify-items-center center absolute top-0 ltr:left-2 ltr:lg:left-4 rtl:right-2 rtl:lg:right-4 bg-event-date w-[64px] h-[82px] z-10">
            <Typography
              variant="caption-l"
              className="text-center"
            >
              {dateFromDay}
            </Typography>
            <Typography
              variant="caption-s"
              className="uppercase text-center -mt-1"
            >
              {dateFromMonth}
            </Typography>
          </div>
          <div className="absolute gap-2 p-2 lg:px-4 lg:py-2 rounded-full flex items-center z-10 top-2 lg:top-3 ltr:right-2 ltr:lg:right-3 rtl:left-2 rtl:lg:left-3 py-4 text-white bg-grey-500">
            {renderSvgIcon('Event', {
              className: 'w-5 h-5',
              width: 20,
              height: 20,
            })}
          </div>
          <Typography
            variant="h3"
            className="line-clamp-2 uppercase text-white mt-1 lg:mt-3 mb-2"
          >
            {entity.title}
          </Typography>
        </div>
        {hasTicket && (
          <Typography
            variant="tag-m"
            className="absolute gap-2 p-2 lg:px-4 lg:py-2 rounded-full flex items-center text-black bg-white z-10 bottom-2 lg:bottom-3 left-1/2 transform -translate-x-1/2"
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
              'block h-full w-full object-cover object-center rounded-lg',
              hasValidUrl(entity?.url) ? 'hover:scale-110 transition duration-300 cursor-pointer' : ''
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </figure>
      </div>
    </Link>
  );
};

export default EventCard;
