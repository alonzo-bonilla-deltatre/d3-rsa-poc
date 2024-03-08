import { CardProps } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';
import Oembed from '@/components/common/Oembed/Oembed';

const SocialCard = ({ data }: { data: CardProps }) => {
  const entity = data.entity as DistributionEntity;
  const card = data.cardDesign;

  return (
    entity && (
      <div className={card?.style?.cardClassName}>
        <div className={`card__container`}>
          <Oembed entity={entity?.fields?.oEmbed}></Oembed>
        </div>
      </div>
    )
  );
};

export default SocialCard;
