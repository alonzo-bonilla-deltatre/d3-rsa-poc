import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import renderCard from '@/components/commons/cards/Card/CardWrapper';
import { CardDesign, CardProps } from '@/models/types/card';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';

type GridProps = {
  items?: DistributionEntity[] | LiveBloggingBlogEntity[] | null;
  itemsPerRow?: number;
  cardDesign: CardDesign;
};
export const getGridClasses = (itemsPerRow: number) => {
  switch (itemsPerRow) {
    case 3:
      return 'md:grid-cols-3';
    case 2:
      return 'md:gap-x-3';
    case 4:
    default:
      return 'md:grid-cols-3 lg:grid-cols-4';
  }
};
const Grid = ({ cardDesign, itemsPerRow, items }: GridProps) => {
  items = items as DistributionEntity[];
  const gridClassName = `grid grid-cols-2 gap-2 md:gap-x-3 lg:gap-x-4 lg:gap-y-10 grid-container-col-span-1:grid-cols-2 grid-container-grid-child-little-space:grid-cols-2 grid-container-grid-child-little-space:lg:flex grid-container-grid-child-little-space:lg:flex-col grid-container-grid-child-little-space:lg:items-center ${getGridClasses(
    getNumberProperty(itemsPerRow, 4)
  )}`;

  return (
    <div className={gridClassName}>
      {items &&
        items.map((entity: DistributionEntity, index: number) => {
          const props = {
            entity,
            cardDesign,
            options: {
              className: 'inline-block',
            },
          } as CardProps;
          return <div key={index}>{renderCard(props)}</div>;
        })}
    </div>
  );
};

export default Grid;
