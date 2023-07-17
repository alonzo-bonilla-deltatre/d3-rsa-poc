/* istanbul ignore file */
import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';
import { getGridChildrenCssClasses, getGridContainerCssClasses } from './DynamicGridHelper';

export type DynamicGridProps = {
  gridTemplate: string;
  componentProps: ComponentProps;
};

const DynamicGrid = ({ ...data }: DynamicGridProps) => {
  const { items, variables, metadata, previewToken } = data.componentProps;
  const classes: string[] = getGridChildrenCssClasses(data.gridTemplate);
  const slotsLength: number = data.gridTemplate.split('-').length;

  return (
    <section className={getGridContainerCssClasses(data.gridTemplate)}>
      {[...Array(slotsLength)].map((_, i: number) => (
        <div
          key={`col${i + 1}_${nanoid()}`}
          id={`col${i + 1}_${nanoid()}`}
          className={classes[i]}
        >
          {renderItemsInSlot(items, 'col' + (i + 1), variables, metadata, previewToken)}
        </div>
      ))}
    </section>
  );
};

export default DynamicGrid;
