/* istanbul ignore file */ import { ComponentProps } from '@/models/types/components';
import { renderItemsInSlot } from '@/services/renderService';
import { nanoid } from 'nanoid';

const leftContent: string = 'leftContent';
const rightContent: string = 'rightContent';

const TwoColumns = ({ ...data }: ComponentProps) => {
  const { properties } = data;

  return (
    <section className={`grid grid-cols-1 lg:grid-cols-2 gap-4`}>
      <div id={`${leftContent}_${nanoid()}`}>{renderItemsInSlot(data.items, leftContent)}</div>
      <div id={`${rightContent}_${nanoid()}`}>{renderItemsInSlot(data.items, rightContent)}</div>
    </section>
  );
};

export default TwoColumns;
