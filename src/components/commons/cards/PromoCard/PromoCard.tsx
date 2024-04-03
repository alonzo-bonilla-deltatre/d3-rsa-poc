import Picture from '@/components/commons/Picture/Picture';
import { CardProps } from '@/models/types/card';
import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/commons/cards/Card/CardHelpers';
import { DistributionEntity } from '@/models/types/forge';
import PromoCardInfo from '@/components/commons/cards/PromoCard/PromoCardInfo';
import { CustomPromoFields } from '@/models/types/forge.customEntityFields';
import PromoButtons from '@/components/commons/cards/PromoCard/PromoButtons';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';

const PromoCard = ({ data }: { data: CardProps }) => {
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
  const promoText =
    entity && (entity.fields as CustomPromoFields).url?.displayText !== undefined
      ? (entity.fields as CustomPromoFields).url.displayText
      : 'promo';

  return (
    <>
      <div className={`${getStringProperty(cardStyle?.cardContainerClassName)}`}>
        <figure className={cardStyle?.cardFigureClassName}>
          <Picture
            src={entityImage?.templateUrl}
            className={cardStyle?.cardImgClassName}
            transformations={cardStyle?.imageTransformations ?? transformations.thumbnail_landscape_detail}
            alt={entity.title}
          />
        </figure>
        {cardStyle?.isInnerInfo && (
          <PromoCardInfo
            entity={entity}
            cardDesign={card}
          />
        )}
        <PromoButtons
          entity={entity as DistributionEntity}
          isCard={true}
        ></PromoButtons>
      </div>
      {!cardStyle?.isInnerInfo && (
        <PromoCardInfo
          entity={entity}
          cardDesign={card}
        />
      )}
    </>
  );
}

export default PromoCard;
