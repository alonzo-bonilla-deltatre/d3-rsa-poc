import { overrideLiveBloggingMetadata } from '@/helpers/metadataLiveBloggingEntityHelper';
import { ComponentProps } from '@/models/types/components';
import { metadata as parentMetadata } from 'src/app/[[...pageName]]/page';
import React from 'react';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { getBlogEntity } from '@/services/liveBloggingDistributionService';
import { notFound } from 'next/navigation';
import LiveBloggingClient from '@/components/modules/LiveBlogging/LiveBloggingClient';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type ModuleProps = {
  slug?: string;
  hideKeyMoments?: boolean;
  preventSettingMetadata?: boolean;
};

const LiveBloggingServer = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  if (!Object.hasOwn(props, 'slug') || !props.slug?.length) {
    const invalidSlugErrorMessage = 'Cannot render Blog module with empty slug';
    logger.log(invalidSlugErrorMessage, LoggerLevel.warning);
    throw new Error(invalidSlugErrorMessage);
  }
  const showKeyMoment = getBooleanProperty(props.hideKeyMoments);
  const blogEntity = await getBlogEntity(props.slug, showKeyMoment ?? false);
  if (blogEntity == null) {
    logger.log(`Cannot find Blog entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  // Override parent metadata
  if (getBooleanProperty(props.preventSettingMetadata)) {
    overrideLiveBloggingMetadata(parentMetadata, blogEntity);
  }

  return blogEntity ? (
    <LiveBloggingClient
      blogEntity={blogEntity}
      hideKeyMoments={showKeyMoment}
      blogBaseUrl={process.env.LIVE_BLOGGING_DAPI_BASE_URL}
    />
  ) : (
    <></>
  );
};
export default LiveBloggingServer;
