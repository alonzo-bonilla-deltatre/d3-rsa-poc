import Picture from '@/components/commons/Picture/Picture';
import { CardProps } from '@/models/types/card';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/commons/cards/Card/CardHelpers';
import CardIcon from '@/components/commons/CardIcon/CardIcon';
import EventRibbon from '@/components/commons/cards/EventCard/EventRibbon';
import EventCardInfo from '@/components/commons/cards/EventCard/EventCardInfo';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';

const EventCard = ({ data }: { data: CardProps }) => {
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
  const cardDesign = props.cardDesign;
  const cardStyle = cardDesign?.style;
  const cardType = cardDesign?.cardType;
  const dateFrom = getStringProperty(entity.fields?.dateFrom, '');
  const venue = getStringProperty(entity.fields?.venue, '');
  const hasTicket = !!(entity.fields?.tickets?.url && entity.fields?.tickets?.displayText);

  return (
    <>
      <div className={`${getStringProperty(cardStyle?.cardContainerClassName)}`}>
        <div className="card__chip--eventicon">
          <CardIcon
            entityCode={entity.entityCode as string}
            hide={false}
          ></CardIcon>
        </div>
        <EventRibbon dateFrom={dateFrom}></EventRibbon>
        {hasTicket ?? (
          <div className="card__chip--ticket top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span>{entity.fields?.tickets?.displayText}</span>
          </div>
        )}
        <figure className={cardStyle?.cardFigureClassName}>
          <Picture
            src={entityImage?.templateUrl}
            className={cardStyle?.cardImgClassName}
            transformations={cardStyle?.imageTransformations ?? transformations.thumbnail_landscape_detail}
            alt={entity.title}
          />
        </figure>
        {cardStyle?.isInnerInfo && (
          <EventCardInfo
            entity={entity}
            title={entity.title}
            summary={venue}
            cardDesign={cardDesign}
          ></EventCardInfo>
        )}
      </div>
      {cardStyle?.isInnerInfo && (
        <EventCardInfo
          entity={entity}
          title={entity.title}
          summary={venue}
          cardDesign={cardDesign}
        ></EventCardInfo>
      )}
    </>
  );
}

export default EventCard;
