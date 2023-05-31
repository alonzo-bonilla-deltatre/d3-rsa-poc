import { DistributionEntity } from '@/models/types/forge';
import { GrandPrixFields } from '@/models/types/forge.customEntityFields';

export const orderedItems = (items: DistributionEntity[]) => {
  return items.sort(
    (a: DistributionEntity, b: DistributionEntity) =>
      new Date((a.fields as GrandPrixFields).dateFrom).valueOf() -
      new Date((b.fields as GrandPrixFields).dateFrom).valueOf()
  );
};

export const getEventMonthString = (date: string) => {
  const eventDate = new Date(date);
  return eventDate.toLocaleString('en-US', { month: 'short' });
};

export const getEventDayString = (date: string) => {
  const eventDate = new Date(date);
  return eventDate.getDate().toString().padStart(2, '0');
};
