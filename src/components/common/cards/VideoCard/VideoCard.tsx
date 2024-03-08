import { getAdditionalLinkAttrs, getCardLinkContainerTag } from '@/components/common/cards/Card/CardHelpers';
import CardIcon from '@/components/common/CardIcon/CardIcon';
import { CardProps, CardType } from '@/models/types/card';
import Picture from '@/components/common/Picture/Picture';
import CardInfo from '@/components/common/CardInfo/CardInfo';
import VideoChip from '@/components/common/VideoChip/VideoChip';
import { getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';

const Card = ({ data }: { data: CardProps }) => {
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
  const rights = getStringProperty(entity.fields?.rights, '');
  const rightsClass = rights && rights.toLowerCase() != 'free' ? rights.toLowerCase() + ' w-[calc(100%_+_3px)]' : '';
  return (
    <>
      <div className={`${getStringProperty(cardStyle?.cardContainerClassName)} ${rightsClass}`}>
        <figure className={cardStyle?.cardFigureClassName}>
          <Picture
            src={entityImage?.templateUrl}
            className={cardStyle?.cardImgClassName}
            transformations={cardStyle?.imageTransformations ?? transformations.thumbnail_landscape_detail}
            alt={entity.title}
          />
        </figure>
        <VideoChip rights={entity.fields.rights ?? ''} />
        <CardIcon
          entityCode={entity.entityCode as string}
          hide={false}
          className={cardType !== CardType.Video ? 'left-2 lg:left-4 bottom-2 lg:bottom-4' : ''}
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
