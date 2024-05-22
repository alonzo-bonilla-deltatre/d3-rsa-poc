import { DistributionEntity } from '@/models/types/forge';
import { CardProps, CardsType, renderCard } from '@/components/commons/cards';

type RelatedItemsProps = {
  relations: any[];
};

const RelatedItems = ({ relations }: RelatedItemsProps) => {
  if (!relations) return null;

  return (
    <>
      {relations.map((relItem: DistributionEntity, index: number) => {
        const cardProps = { entity: relItem } as CardProps;
        return (
          <div
            className={'flex flex-col gap-2 justify-between lg:pb-8 lg:border-b last:border-0'}
            key={index}
          >
            {renderCard(CardsType.StoryRelatedItemCard, cardProps)}
          </div>
        );
      })}
    </>
  );
};

export default RelatedItems;
