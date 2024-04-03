import renderCard from '@/components/commons/cards/Card/CardWrapper';
import { CardDesign, CardProps } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';

type RelatedItemsProps = {
  relations: any[];
  hide?: boolean;
  cardDesign: CardDesign;
};

const RelatedItems = ({ cardDesign, relations, hide }: RelatedItemsProps) => {
  if (hide || !relations) return null;

  return (
    <>
      {relations.map((relItem: DistributionEntity, index: number) => {
        const cardProps = {
          entity: relItem,
          cardDesign: cardDesign,
        } as CardProps;
        return <div key={index}>{renderCard(cardProps)}</div>;
      })}
    </>
  );
};

export default RelatedItems;
