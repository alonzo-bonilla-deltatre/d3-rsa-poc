import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import Link from '@/components/commons/Link/Link';
import Picture from '@/components/commons/Picture/Picture';

type CardProps = {
  entity: DistributionEntity;
};

const AlbumCard = ({ entity }: CardProps) => {
  if (!entity) return null;
  return (
    <Link
      href={entity.url}
      className="h-full w-full"
    >
      <div className="relative flex rounded-lg">
        <figure className="z-10 overflow-hidden rounded-lg bg-black">
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
              'block h-full w-full rounded-lg object-cover object-center opacity-[.60]',
              hasValidUrl(entity?.url) ? 'cursor-pointer transition duration-300 hover:scale-110' : ''
            )}
            format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
          />
        </figure>
        <div className="absolute bottom-0 z-10 flex flex-col items-start justify-end gap-2 p-6 text-white">
          <Typography
            variant="h3"
            as="div"
            className="line-clamp-2 text-ellipsis uppercase"
          >
            {entity.title}
          </Typography>
          {entity.elementsCount && (
            <Typography variant="body-m">
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
