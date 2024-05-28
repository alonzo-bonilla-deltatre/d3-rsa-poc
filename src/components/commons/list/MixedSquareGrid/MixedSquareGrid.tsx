import { DistributionEntity } from '@/models/types/forge';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import SearchCard from '@/components/commons/cards/SearchCard/SearchCard';
import { CardsType, renderCard } from '@/components/commons/cards';

type MixedSquareGridProps = {
  items?: DistributionEntity[] | LiveBloggingBlogEntity[] | null;
  cardsType: CardsType;
};

export const getGridClasses = (index: number) => {
  let count = index;
  if (index > 5) {
    do {
      count -= 6;
    } while (count > 5);
  }
  let row = Math.floor(index / 5);
  row = row === 0 ? 3 : row * 4 + 1;
  if (count === 0) {
    return 'row-span-2 col-span-2';
  } else if (count % 3 === 0) {
    return `row-span-1 col-span-1 col-start-1 row-start-${row}`;
  } else if (count % 4 === 0) {
    return `row-span-2 col-span-2 row-start-${row} col-start-2`;
  } else if (count % 5 === 0) {
    return `row-span-1 col-span-1 col-start-1 row-start-${row + 1}`;
  } else if (count % 6 === 0) {
    return `row-span-2 col-span-2`;
  } else {
    return 'row-span-1 col-span-1';
  }
};

const MixedSquareGrid = ({ items, cardsType }: MixedSquareGridProps) => {
  items = items as DistributionEntity[];
  const gridClassName = `grid grid-cols-2 grid-rows-2 gap-10 md:grid-cols-3`;

  return (
    <div className={gridClassName}>
      {items &&
        items.map((entity: DistributionEntity, index: number) => {
          return (
            <div
              key={index}
              className={getGridClasses(index)}
            >
              {renderCard(cardsType, { entity })}
            </div>
          );
        })}
    </div>
  );
};

export default MixedSquareGrid;
