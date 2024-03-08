'use client';

import React from 'react';
import Script from 'next/script';
import { LiveBloggingBlogEntity } from '@/models/types/liveblogging';
import '@/components/modules/LiveBlogging/LiveBloggingWidget.css';
import '@/components/modules/LiveBlogging/LiveBlogging.css';

type LiveBloggingClientProps = {
  blogEntity: LiveBloggingBlogEntity | null;
  blogBaseUrl?: string;
};

const LiveBloggingClient = ({ blogEntity, blogBaseUrl }: LiveBloggingClientProps) => {
  if (!blogEntity) return null;

  const jsAssetUrl = new URL('widget/static/js/liveblog.main.js', blogBaseUrl).href;

  return (
    <>
      <Script src={jsAssetUrl} />
      <div
        className="liveblog-embed"
        data-config={JSON.stringify(blogEntity.widgetConfig)}
      />
    </>
  );
};
export default LiveBloggingClient;
