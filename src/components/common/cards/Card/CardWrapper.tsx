import VideoCard from '@/components/common/cards/VideoCard/VideoCard';
import Card from '@/components/common/cards/Card/Card';
import { CardProps } from '@/models/types/card';
import PlayerCard from '@/components/common/cards/PlayerCard/PlayerCard';
import { DistributionEntity, ForgeEntityCode } from '@/models/types/forge';
import ShopCard from '@/components/common/cards/ShopCard/ShopCard';
import PromoCard from '@/components/common/cards/PromoCard/PromoCard';
import SocialCard from '@/components/common/cards/SocialCard/SocialCard';
import EventCardFeatured from '@/components/common/cards/EventCard/EventCardFeatured';
import EventCard from '@/components/common/cards/EventCard/EventCard';
import { getBooleanPropertyDefault } from '@/helpers/pageComponentPropertyHelper';
import AlbumCard from '@/components/common/cards/AlbumCard/AlbumCard';
import { overrideEntityCardDesign } from '@/components/common/cards/Card/CardHelpers';
import { ReturnComponentRender } from '@/models/types/components';

const CardWrapper = ({ data }: { data: CardProps }): ReturnComponentRender => {
  const entity = data.entity;
  const entityCode = entity.entityCode ? entity.entityCode : entity.type;
  const cardDesign = data.cardDesign;
  const isFeatured = getBooleanPropertyDefault(cardDesign?.options?.isFeatured, false);

  switch (entityCode) {
    case ForgeEntityCode.album:
      return (
        <AlbumCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.album),
          }}
        />
      );
    case ForgeEntityCode.divaVideo:
      return (
        <VideoCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.divaVideo),
          }}
        />
      );
    case ForgeEntityCode.youTubeVideo:
      return (
        <VideoCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.youTubeVideo),
          }}
        />
      );
    case ForgeEntityCode.brightcoveVideo:
      return (
        <VideoCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.brightcoveVideo),
          }}
        />
      );
    case ForgeEntityCode.player:
      return (
        <PlayerCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.player),
          }}
        />
      );
    case ForgeEntityCode.shopProduct:
      return (
        <ShopCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.shopProduct),
          }}
        />
      );
    case ForgeEntityCode.promo:
      return (
        <PromoCard
          data={{
            entity: entity,
            cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.promo),
          }}
        />
      );
    case ForgeEntityCode.event:
      if (isFeatured) {
        return (
          <EventCardFeatured
            data={{
              entity: entity,
              cardDesign: cardDesign,
            }}
          />
        );
      } else {
        return (
          <EventCard
            data={{
              entity: entity,
              cardDesign: overrideEntityCardDesign(cardDesign, ForgeEntityCode.event),
            }}
          />
        );
      }
    case ForgeEntityCode.social:
      return (
        <SocialCard
          data={{
            entity: entity,
            cardDesign: cardDesign,
          }}
        />
      );
    default:
      return (
        <Card
          data={{
            entity: entity,
            cardDesign: cardDesign,
          }}
        />
      );
  }
};

const render = ({ ...data }: CardProps): ReturnComponentRender => {
  if (!data || !data.entity) return null;
  return <CardWrapper data={data} />;
};

export default render;
