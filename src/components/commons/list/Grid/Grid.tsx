import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import SearchCard from '@/components/commons/cards/SearchCard/SearchCard';
import { CardsType, renderCard } from '@/components/commons/cards';

type GridProps = {
  items?: DistributionEntity[] | LiveBloggingBlogEntity[] | null;
  itemsPerRow?: number;
  cardsType: CardsType;
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
const Grid = ({ itemsPerRow, items, cardsType }: GridProps) => {
  items = items as DistributionEntity[];
  const gridClassName = `grid grid-cols-2 gap-2 md:gap-x-3 lg:gap-x-4 lg:gap-y-10 ${getGridClasses(
    getNumberProperty(itemsPerRow, 4),
  )}`;

  return (
    <div className={gridClassName}>
      {items &&
        items.map((entity: DistributionEntity, index: number) => {
          return (
            <div key={index}>
              {renderCard(cardsType, entity)}
              <SearchCard entity={entity} />
            </div>
          );
        })}
    </div>
  );
};

export default Grid;
