import Typography from '@/components/commons/Typography/Typography';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { twMerge } from 'tailwind-merge';
import { hasValidUrl } from '@/helpers/urlHelper';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

type SearchCardProps = {
  entity: DistributionEntity;
};

const AlbumCard = ({ entity }: SearchCardProps) => {
  if (!entity) return null;
  return (
    <div className="flex rounded-lg">
      <figure className="bg-black rounded-lg">
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
            hasValidUrl(entity?.url) ? 'hover:scale-110 transition duration-300 cursor-pointer' : ''
          )}
          format={entity.thumbnail?.format ? entity.thumbnail?.format : entity.image?.format}
        />
      </figure>
      <div className="flex flex-col absolute w-full h-full text-white gap-5 justify-end items-start p-6">
        <Typography
          variant={'body-l'}
          className={'line-clamp-1 text-ellipsis uppercase'}
        >
          {entity.title}
        </Typography>
        <Typography variant={'tag-l'}>
          <span>
            {entity.elementsCount + ' '}
            <TranslatedLabel translationTermKey={ForgeDapiEntityCode.photos ?? ''} />
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default AlbumCard;
