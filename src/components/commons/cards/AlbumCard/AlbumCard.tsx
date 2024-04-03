import CardIcon from '@/components/commons/CardIcon/CardIcon';
import CardInfo from '@/components/commons/cards/AlbumCard/AlbumCardInfo';
import CardSponsor from '@/components/commons/cards/Card/CardSponsor';
import Picture from '@/components/commons/Picture/Picture';
import { CardProps } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';
import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/commons/cards/Card/CardHelpers';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';

const AlbumCard = ({ data }: { data: CardProps }) => {
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
  const entity = props.entity as DistributionEntity;
  const entityImage = entity.image ? entity.image : entity.thumbnail ? entity.thumbnail : entity.coverImage;
  const card = props.cardDesign;
  const cardStyle = card?.style;
  return (
    <>
      <div className={getStringProperty(cardStyle?.cardContainerClassName)}>
        <figure>
          <Picture
            src={entityImage?.templateUrl}
            className={cardStyle?.cardImgClassName}
            transformations={cardStyle?.imageTransformations ?? transformations.thumbnail_landscape_detail}
            alt={entity.title}
          />
        </figure>
        <CardSponsor entity={entity}></CardSponsor>
        <CardIcon
          entityCode={entity.entityCode as string}
          hide={card?.options?.hideIcon}
        ></CardIcon>
        {cardStyle?.isInnerInfo && (
          <CardInfo
            entity={entity}
            cardDesign={card}
          />
        )}
      </div>
      {!cardStyle?.isInnerInfo && (
        <CardInfo
          entity={entity}
          cardDesign={card}
        />
      )}
    </>
  );
}

export default AlbumCard;
