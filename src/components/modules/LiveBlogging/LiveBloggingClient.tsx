'use client';

import React from 'react';
import Script from 'next/script';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import '@/components/modules/LiveBlogging/LiveBloggingWidget.css';
import '@/components/modules/LiveBlogging/LiveBlogging.css';

type ModuleProps = {
  blogEntity: LiveBloggingBlogEntity | null;
  hideKeyMoments?: boolean;
  blogBaseUrl?: string;
};

const LiveBloggingClient = ({ ...props }: ModuleProps) => {
  const jsAssetUrl = new URL('widget/static/js/liveblog.main.js', props.blogBaseUrl).href;

  return props.blogEntity ? (
    <>
      <Script src={jsAssetUrl} />
      <div
        className="liveblog-embed"
        data-config={JSON.stringify(props.blogEntity.widgetConfig)}
      />
    </>
  ) : (
    <></>
  );
};
export default LiveBloggingClient;
