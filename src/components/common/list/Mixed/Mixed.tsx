import { DistributionEntity } from '@/models/types/forge';
import { CardDesign, CardLayout, CardProps, CardType } from '@/models/types/card';
import renderCard from '@/components/common/cards/Card/CardWrapper';
import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';

type MixedProps = {
  items?: DistributionEntity[] | null;
};

const Mixed = ({ items }: MixedProps) => {
  items = items as DistributionEntity[];
  const cardType = CardType.MediaMixed;
  const cardLayout = CardLayout.Landscape;
  let cardDesign = getCardSettings(cardType, null, cardLayout);
  const defaultDesign = {
    ...cardDesign,
  };
  const firstDesign = {
    ...cardDesign,
    style: {
      ...cardDesign?.style,
      cardClassName: `${cardDesign?.style?.cardClassName} grid xl:gap-2 columns-1 lg:block lg:relative md:col-span-2 md:row-span-2 lg:columns-1`,
    },
    options: {
      ...cardDesign?.options,
      hideSummary: false,
    },
  } as CardDesign;

  return (
    <div className="flex flex-col max-w-screen-sm md:grid md:grid-cols-4 md:gap-4 md:gap-y-2 md:max-w-full">
      {items &&
        items.map((entity: DistributionEntity, index: number) => {
          if (index === 0) {
            cardDesign = firstDesign;
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

export default Mixed;
