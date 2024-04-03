import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import { CardDesign, CardLayout, CardProps, CardType } from '@/models/types/card';
import renderCard from '@/components/commons/cards/Card/CardWrapper';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';

type MixedSquaredProps = {
  items?: DistributionEntity[] | LiveBloggingBlogEntity[] | null;
};

const MixedSquared = ({ items }: MixedSquaredProps) => {
  items = items as DistributionEntity[];
  const cardType = CardType.MediaMixed;
  const cardLayout = CardLayout.SquaredFullSm;
  let cardDesign = getCardSettings(cardType, null, cardLayout);
  let cardDesignBig = getCardSettings(cardType, null, CardLayout.SquaredFullLg);
  const defaultDesign = {
    ...cardDesign,
  };
  const bigDesign = {
    ...cardDesignBig,
    style: {
      ...cardDesignBig?.style,
      cardClassName: `${cardDesignBig?.style?.cardClassName} grid xl:gap-2 columns-1 lg:block lg:relative md:col-span-2 md:row-span-2 lg:columns-1`,
    },
    options: {
      ...cardDesignBig?.options,
      hideSummary: false,
    },
  } as CardDesign;
  return (
    <div className="flex flex-col max-w-screen-sm md:grid md:grid-cols-3 md:gap-4 gap-y-2 md:max-w-full">
      {items &&
        items.map((entity: DistributionEntity, index: number) => {
          if (index === 0 || index === 4) {
            cardDesign = bigDesign;
          } else {
            cardDesign = defaultDesign;
          }
          const cardProps = {
            entity,
            cardDesign,
          } as CardProps;
          return <div key={index}>{renderCard(cardProps)}</div>;
        })}
    </div>
  );
};

export default MixedSquared;
