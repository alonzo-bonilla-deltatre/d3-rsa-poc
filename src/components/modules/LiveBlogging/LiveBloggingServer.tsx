import { ComponentProps } from '@/models/types/components';
import React from 'react';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { getBlogEntity } from '@/services/liveBloggingDistributionService';
import { notFound } from 'next/navigation';
import LiveBloggingClient from '@/components/modules/LiveBlogging/LiveBloggingClient';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

type LiveBloggingServerProps = {
  slug?: string;
  hideKeyMoments?: boolean;
  preventSettingMetadata?: boolean;
};

const LiveBloggingServer = async ({ data }: { data: ComponentProps }) => {
  const props = data.properties as LiveBloggingServerProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const showKeyMoment = getBooleanProperty(props.hideKeyMoments);
  const blogEntity = await getBlogEntity(props.slug ?? '', showKeyMoment ?? false);

  if (!blogEntity) {
    logger.log(`Cannot find Blog entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  return (
    <LiveBloggingClient
      blogEntity={blogEntity}
      blogBaseUrl={process.env.LIVE_BLOGGING_DAPI_BASE_URL}
    />
  );
};

export default LiveBloggingServer;
