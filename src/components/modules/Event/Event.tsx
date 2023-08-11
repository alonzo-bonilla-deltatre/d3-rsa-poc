import { ComponentProps } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { getEventEntity } from '@/services/eventService';
import { getEntity } from '@/services/forgeDistributionService';
import logger from '@/utilities/logger';
import dynamic from 'next/dynamic';

// @ts-ignore
const EventDetail = dynamic(() => import('@/components/common/events/EventDetail/EventDetail'));

type ModuleProps = {
  slug?: string;
  preventSettingMetadata?: boolean;
};

const Event = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, 'slug') || !properties.slug?.length) {
    logger.log('Cannot render Event module with empty slug', LoggerLevel.warning);
    return <div />;
  }

  const eventEntity = await getEntity('events', properties?.slug);
  const eventEnriched = eventEntity ? await getEventEntity(eventEntity) : null;

  return eventEnriched ? <EventDetail entity={eventEnriched}></EventDetail> : <div />;
};
export default Event;
