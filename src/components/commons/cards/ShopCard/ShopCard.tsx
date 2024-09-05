import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import Link from '@/components/commons/Link/Link';
import Picture from '@/components/commons/Picture/Picture';

type CardProps = {
  entity: DistributionEntity;
};

const ShopCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  const isPromo = getBooleanProperty(entity.fields?.enablePromoBadge);
  const shopUrl = entity.fields?.url?.url ? entity.fields?.url?.url : entity.url;

  return (
    <Link
      href={shopUrl ?? entity.url}
      className="h-full w-full"
    >
      <div className="flex flex-col gap-2 lg:gap-4">
        <div
          className={twMerge(
            'relative flex aspect-[10/16] h-full min-w-[136px] rounded-lg bg-black',
            isPromo ? 'border-4 border-link' : 'w-[calc(100%_-_3px)]'
          )}
        >
          <figure className={twMerge('relative z-10 overflow-hidden rounded-lg', isPromo ? 'rounded' : 'rounded-lg')}>
            <Picture
              src={
                entity?.thumbnail?.templateUrl
                  ? entity?.thumbnail?.templateUrl
                  : entity?.image?.templateUrl
                    ? entity?.image?.templateUrl
                    : ''
              }
              transformations={transformations.thumbnail_portrait_wide_detail}
              alt={entity.title}
              className={twMerge(
                'block h-full w-full object-cover object-center',
                hasValidUrl(shopUrl) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
              )}
              format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
            />
          </figure>
          <div className="absolute bottom-0 flex flex-col items-start justify-end gap-5 p-6 text-white">
            <Typography
              variant="tag-m"
              className="absolute bottom-2 z-10 flex items-center gap-2 rounded-full bg-link p-2 uppercase text-white lg:bottom-3 lg:px-4 lg:py-2 ltr:left-2 ltr:lg:left-3 rtl:right-2 rtl:lg:right-3"
            >
              promo
            </Typography>
          </div>
        </div>

        <Typography
          variant="body-l"
          className="line-clamp-2 text-ellipsis"
        >
          {entity.title}
        </Typography>
        {isPromo ? (
          <div className="md:text-2.5xl mt-2 flex flex-row text-2xl tracking-[0.0175em]">
            <div className="me-2 text-grey-300 line-through dark:text-grey-100">{entity.fields?.price}</div>
            {entity.fields?.salePrice}
          </div>
        ) : (
          <div className="md:text-2.5xl mt-1 flex flex-row text-2xl tracking-[0.0175em]">{entity.fields?.price}</div>
        )}
      </div>
    </Link>
  );
};

export default ShopCard;
