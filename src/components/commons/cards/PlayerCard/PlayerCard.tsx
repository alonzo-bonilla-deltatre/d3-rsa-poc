import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import Link from '@/components/commons/Link/Link';

type CardProps = {
  entity: DistributionEntity;
};

const PlayerCard = ({ entity }: CardProps) => {
  if (!entity) return null;

  const playerNumber = entity?.fields?.number ?? '';
  const playerName = entity?.fields?.name ?? '';
  const playerSurname = entity?.fields?.surname ?? '';

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
        <div className="absolute top-1 left-5 z-10">
          {playerNumber &&
            <Typography variant={'h1'} className="text-grey-300 leading-none">{playerNumber}</Typography>}
        </div>
        <div className="flex flex-col absolute bottom-0 text-white gap-5 justify-end items-start p-6 z-10">
          <div className="flex justify-end flex-col z-10">
            <div
              className="font-heading font-light text-5xl xl:text-6xl uppercase flex flex-row tracking-wide">
              {playerName}
              <div
                className={
                  'ml-2 font-heading font-normal text-5xl xl:text-6xl text-white uppercase tracking-wide'
                }
              >
                {playerSurname}
              </div>
            </div>
            {entity?.fields?.roles && entity?.fields.roles.length > 0 && (
              <div
                className="font-heading font-light text-2xl xl:text-3xl uppercase tracking-wide">
                {entity?.fields.roles[0]}
              </div>
            )}
            <div className="my-2 flex gap-2 items-center">
              {entity?.fields?.playerNationalityFlag?.assetUrl && (
                <div className={'w-full h-full max-w-[20px] max-h-[20px] xl:max-w-[28px] xl:max-h-[28px]'}>
                  <GadAsset
                    src={entity?.fields.playerNationalityFlag?.assetUrl}
                    width={22}
                    height={22}
                    title={entity?.fields?.nationality ?? 'nationality flag'}
                    transformations={transformations.best_assets}
                    className={'rounded-full object-fill'}
                    imageStyle={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'fill',
                    }}
                  />
                </div>
              )}
              {entity?.fields?.nationality && (
                <div className={'font-heading font-light text-2xl xl:text-3xl text-grey-300 uppercase'}>
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
