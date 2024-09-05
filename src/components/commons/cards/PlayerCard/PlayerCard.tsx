import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import Link from '@/components/commons/Link/Link';
import Picture from '@/components/commons/Picture/Picture';

type CardProps = {
  entity: DistributionEntity;
};

const PlayerCard = ({ entity }: CardProps) => {
  if (!entity) return null;

  const playerNumber = entity?.fields?.number ?? '';
  const playerName = entity?.fields?.name ?? '';
  const playerSurname = entity?.fields?.surname ?? '';

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
        <div className="absolute left-5 top-1 z-10">
          {playerNumber && (
            <Typography
              variant="h1"
              className="leading-none text-grey-300"
            >
              {playerNumber}
            </Typography>
          )}
        </div>
        <div className="absolute bottom-0 z-10 m-2 flex flex-col items-start justify-end gap-5 text-white lg:m-6">
          <div className="z-10 flex flex-shrink-0 flex-col justify-end">
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-col font-heading text-5xl font-light uppercase tracking-wide xl:text-6xl">
                {playerName}
              </div>
              <div className="font-heading text-5xl font-normal uppercase tracking-wide text-white xl:text-6xl">
                {playerSurname}
              </div>
            </div>
            {entity?.fields?.roles && entity?.fields.roles.length > 0 && (
              <div className="font-heading text-2xl font-light uppercase tracking-wide xl:text-3xl">
                {entity?.fields.roles[0]}
              </div>
            )}
            <div className="flex items-center gap-2">
              {entity?.fields?.playerNationalityFlag?.assetUrl && (
                <div className="h-full max-h-[20px] w-full max-w-[20px] xl:max-h-[28px] xl:max-w-[28px]">
                  <GadAsset
                    src={entity?.fields.playerNationalityFlag?.assetUrl}
                    width={22}
                    height={22}
                    title={entity?.fields?.nationality ?? 'nationality flag'}
                    transformations={transformations.best_assets}
                    className="rounded-full object-fill"
                    imageStyle={{
                      width: '22px',
                      height: '22px',
                    }}
                  />
                </div>
              )}
              {entity?.fields?.nationality && (
                <div className="font-heading text-2xl font-light uppercase text-grey-300 xl:text-3xl">
                  {entity?.fields.nationality}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
