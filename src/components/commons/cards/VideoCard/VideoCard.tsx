import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { renderSvgIcon } from '@/components/icons';
import Link from '@/components/commons/Link/Link';
import { getDescriptionField } from '@/utilities/descriptionFieldUtility';
import Picture from '@/components/commons/Picture/Picture';
import Date from '@/components/commons/Date/Date';
import { DateType } from '@/models/types/date';

type CardProps = {
  entity: DistributionEntity;
};

const VideoCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const rights = getStringProperty(entity.fields?.rights, '');
  const isPremium = rights?.toLowerCase() === 'premium';
  const isFreemium = rights?.toLowerCase() === 'freemium';
  const description = getDescriptionField(entity);
  return (
    <Link
      href={entity.url}
      className="h-full w-full"
    >
      <div className="flex flex-col gap-2">
        <div className="relative">
          <div
            className={twMerge(
              'relative flex aspect-[10/16] h-full min-w-[136px] rounded-lg bg-black',
              rights ? 'border-4 border-link' : '',
              isPremium ? 'border-4 border-gold' : '',
              isFreemium ? 'border-4 border-white' : '',
              !rights ? '' : 'w-[calc(100%_-_3px)]'
            )}
          >
            <figure
              className={twMerge(
                'relative z-10 overflow-hidden bg-black',
                isPremium || isFreemium || rights ? 'rounded' : 'rounded-lg'
              )}
            >
              <Picture
                src={
                  entity?.thumbnail?.templateUrl
                    ? entity?.thumbnail?.templateUrl
                    : entity?.image?.templateUrl
                      ? entity?.image?.templateUrl
                      : ''
                }
                transformations={transformations.thumbnail_portrait_wide_detail}
                imageStyle={{
                  aspectRatio: '10:16',
                }}
                alt={entity.title}
                className={twMerge(
                  'block h-full w-full object-cover object-center',
                  hasValidUrl(entity?.url) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
                )}
                format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
              />
            </figure>
            {rights && (
              <div className="absolute flex h-full w-full flex-col items-start justify-end gap-5 p-6 text-black">
                <Typography
                  variant="tag-m"
                  className={twMerge(
                    'absolute end-2 top-2 z-10 flex items-center gap-2 rounded-full bg-link p-2 uppercase text-white lg:end-3 lg:top-3 lg:px-4 lg:py-2',
                    isFreemium ? 'bg-white text-black' : '',
                    isPremium ? 'bg-gold text-black' : ''
                  )}
                >
                  {rights}
                  {isPremium && <>{renderSvgIcon('Lock', { className: 'w-2.5 h-3', width: 10, height: 10 })}</>}
                  {isFreemium && <>{renderSvgIcon('Unlock', { className: 'w-2.5 h-3', width: 10, height: 10 })}</>}
                </Typography>
              </div>
            )}
          </div>
          <div className="absolute bottom-2 left-2 z-10 text-white lg:bottom-4 lg:left-4 rtl:right-2 rtl:lg:right-4">
            {renderSvgIcon('Play', { className: 'w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12', width: 50, height: 50 })}
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-end gap-2 text-white">
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

export default VideoCard;
