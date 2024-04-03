import Picture from '@/components/commons/Picture/Picture';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/commons/cards/Card/CardHelpers';
import { CardProps } from '@/models/types/card';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';

const PlayerCard = ({ data }: { data: CardProps }) => {
  const entity = data.entity as DistributionEntity;
  const card = data.cardDesign;
  const cardStyle = card?.style;
  const linkClassName = cardStyle?.isHorizontal ? 'flex flex-grow-1' : '';
  const additionalAttributes = getAdditionalLinkAttrs(entity);
  const CardLinkContainer = getCardLinkContainerTag(entity);

  return (
    entity && (
      <div className={getStringProperty(cardStyle?.cardClassName)}>
        <CardLinkContainer
          className={linkClassName}
          {...additionalAttributes}
        >
          {renderCardLinkComponent(data)}
        </CardLinkContainer>
      </div>
    )
  );
};

function renderCardLinkComponent(props: CardProps) {
  const entity = props.entity;
  const entityImage = entity.image ? entity.image : entity.thumbnail ? entity.thumbnail : entity.coverImage;
  const card = props.cardDesign;
  const cardStyle = card?.style;
  const cardType = props.cardDesign?.cardType;

  const playerNumber = entity?.fields.number ?? '';
  const playerName = entity?.fields.name ?? '';
  const playerSurname = entity?.fields.surname ?? '';

  return (
    <div className={`${getStringProperty(cardStyle?.cardContainerClassName)}`}>
      <figure className={cardStyle?.cardFigureClassName}>
        <Picture
          src={entityImage?.templateUrl}
          className={cardStyle?.cardImgClassName}
          transformations={cardStyle?.imageTransformations ?? transformations.thumbnail_landscape_detail}
          alt={entity.title}
        />
      </figure>
      <div className="card__number">
        {entity?.fields.number && <div className="d3-ty-heading-1 text-grey-300 leading-none">{playerNumber}</div>}
      </div>
      <div className={`${cardStyle?.cardInfoClassName}`}>
        <div className="flex justify-end flex-col z-10">
          <div className="font-heading font-light text-5xl xl:text-6xl story__rel-items:text-5xl uppercase flex flex-row tracking-wide">
            {playerName}
            <div
              className={
                'ml-2 font-heading font-normal text-5xl xl:text-6xl story__rel-items:text-5xl text-white uppercase tracking-wide'
              }
            >
              {playerSurname}
            </div>
          </div>
          {entity?.fields.roles && entity?.fields.roles.length > 0 && (
            <div className="font-heading font-light text-2xl xl:text-3xl story__rel-items:text-2xl uppercase tracking-wide">
              {entity?.fields.roles[0]}
            </div>
          )}
          <div className="my-2 flex gap-2 items-center">
            {entity?.fields.playerNationalityFlag?.assetUrl && (
              <div className={'w-full h-full max-w-[20px] max-h-[20px] xl:max-w-[28px] xl:max-h-[28px]'}>
                <GadAsset
                  src={entity?.fields.playerNationalityFlag?.assetUrl}
                  width={22}
                  height={22}
                  title={entity?.fields?.nationality ?? 'nationality flag'}
                  transformations={transformations.best_assets}
                  className={'flag object-fill'}
                  imageStyle={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                  }}
                />
              </div>
            )}
            {entity?.fields.nationality && (
              <div className={'font-heading font-light text-2xl xl:text-3xl text-grey-300 uppercase'}>
                {entity?.fields.nationality}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
