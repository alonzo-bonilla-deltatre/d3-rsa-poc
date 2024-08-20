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
      className="w-full h-full"
    >
      <div className="flex flex-col gap-2 lg:gap-4">
        <div
          className={twMerge(
            'flex rounded-lg relative aspect-[10/16] h-full min-w-[136px] bg-black',
            isPromo ? 'border-4 border-link' : 'w-[calc(100%_-_3px)]'
          )}
        >
          <figure className={twMerge('overflow-hidden rounded-lg z-10 relative', isPromo ? 'rounded' : 'rounded-lg')}>
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
                hasValidUrl(shopUrl) ? 'hover:scale-110 transition duration-300 cursor-pointer' : ''
              )}
              format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
            />
          </figure>
          <div className="flex flex-col absolute bottom-0 text-white gap-5 justify-end items-start p-6">
            <Typography
              variant="tag-m"
              className="absolute gap-2 p-2 lg:px-4 lg:py-2 rounded-full flex items-center z-10 uppercase bottom-2 lg:bottom-3 ltr:left-2 ltr:lg:left-3 rtl:right-2 rtl:lg:right-3 text-white bg-link"
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
          <div className="flex flex-row mt-2 text-2xl md:text-2.5xl tracking-[0.0175em]">
            <div className="text-grey-300 dark:text-grey-100 me-2 line-through">{entity.fields?.price}</div>
            {entity.fields?.salePrice}
          </div>
        ) : (
          <div className="flex flex-row mt-1 text-2xl md:text-2.5xl  tracking-[0.0175em]">{entity.fields?.price}</div>
        )}
      </div>
    </Link>
  );
};

export default ShopCard;
