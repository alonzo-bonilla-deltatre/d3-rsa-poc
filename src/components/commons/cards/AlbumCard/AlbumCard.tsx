import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import Link from '@/components/commons/Link/Link';

type CardProps = {
  entity: DistributionEntity;
};

const AlbumCard = ({ entity }: CardProps) => {
  if (!entity) return null;
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
            transformations={transformations.thumbnail_portrait_wide_detail}
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
            variant={'h3'} as={'div'}
            className={'line-clamp-2 text-ellipsis uppercase'}
          >
            {entity.title}
          </Typography>
          {entity.elementsCount && (
            <Typography variant={'body-m'}>
          <span>
            {entity.elementsCount + ' '}
            <TranslatedLabel translationTermKey={ForgeDapiEntityCode.photos ?? ''} />
          </span>
            </Typography>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AlbumCard;
