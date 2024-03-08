import Picture from '@/components/common/Picture/Picture';
import { CardProps } from '@/models/types/card';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/common/cards/Card/CardHelpers';
import ShopCardInfo from '@/components/common/cards/ShopCard/ShopCardInfo';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';

const ShopCard = ({ data }: { data: CardProps }) => {
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

  const isPromo = getBooleanProperty(entity.fields?.enablePromoBadge);
  const isPromoClass = isPromo ? 'promo w-[calc(100%_+_3px)]' : '';
  const shopUrl = entity.fields?.url?.url !== undefined ? entity.fields?.url?.url : '#nolink';
  return (
    <>
      <div className={`${getStringProperty(cardStyle?.cardContainerClassName)} ${isPromoClass}`}>
        <figure className={cardStyle?.cardFigureClassName}>
          <Picture
            src={entityImage?.templateUrl}
            className={cardStyle?.cardImgClassName}
            transformations={cardStyle?.imageTransformations ?? transformations.thumbnail_landscape_detail}
            alt={entity.title}
          />
        </figure>
        {isPromo && (
          <div className="card__chip--promo d3-ty-tag-small">
            <span>promo</span>
          </div>
        )}
        {cardStyle?.isInnerInfo && (
          <ShopCardInfo
            entity={entity}
            cardDesign={card}
            isPromo={isPromo}
          />
        )}
      </div>
      {!cardStyle?.isInnerInfo && (
        <ShopCardInfo
          entity={entity}
          cardDesign={card}
          isPromo={isPromo}
        />
      )}
    </>
  );
}

export default ShopCard;
