import CardIcon from '@/components/common/CardIcon/CardIcon';
import CardInfo from '@/components/common/CardInfo/CardInfo';
import Picture from '@/components/common/Picture/Picture';
import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/common/cards/Card/CardHelpers';
import CardSponsor from '@/components/common/cards/Card/CardSponsor';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardProps } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';

const Card = ({ data }: { data: CardProps }) => {
  const entity = data.entity as DistributionEntity;
  const card = data.cardDesign;
  const cardStyle = card?.style;
  const linkClassName = cardStyle?.isHorizontal ? 'flex' : '';
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
  const cardOptions = card?.options;
  return (
    <>
      <div className={getStringProperty(cardStyle?.cardContainerClassName)}>
        <figure className={cardStyle?.cardFigureClassName}>
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
          hide={cardOptions?.hideIcon}
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

export default Card;
