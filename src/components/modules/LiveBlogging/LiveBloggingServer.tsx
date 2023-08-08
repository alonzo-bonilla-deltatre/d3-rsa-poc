import { overrideLiveBloggingMetadata } from '@/helpers/metadataLiveBloggingEntityHelper';
import { ComponentProps } from '@/models/types/components';
import { metadata as parentMetadata } from 'src/app/[[...pageName]]/page';
import React from 'react';
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { getBlogEntity } from '@/services/liveBloggingDistributionService';
import { notFound } from 'next/navigation';
import LiveBloggingClient from '@/components/modules/LiveBlogging/LiveBloggingClient';

type ModuleProps = {
  slug?: string;
  hideKeyMoments?: boolean;
  preventSettingMetadata?: boolean;
};

const LiveBloggingServer = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  if (!Object.hasOwn(props, 'slug') || !props.slug?.length) {
    logger.log('Cannot render Blog module with empty slug', LoggerLevel.warning);
    return <div />;
  }
  const showKeyMoment = props.hideKeyMoments === undefined || props.hideKeyMoments?.toString() === 'false';
  const blogEntity = await getBlogEntity(props.slug, showKeyMoment ?? false);
  if (blogEntity == null) {
    logger.log(`Cannot find Blog entity with slug ${props.slug} `, LoggerLevel.warning);
    notFound();
  }

  // Override parent metadata
  if (props.preventSettingMetadata?.toString() === 'false' || props.preventSettingMetadata === undefined) {
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
