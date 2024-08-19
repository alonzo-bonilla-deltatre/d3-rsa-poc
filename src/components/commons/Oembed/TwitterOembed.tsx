'use client';

import React, { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';
import Script from 'next/script';

type OembedProps = {
  html: string;
};

const TwitterOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    (window as any)?.twttr?.widgets?.load();
  }, []);

  if (!html) return null;

  return (
    <>
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy={'beforeInteractive'}
        id={'twitter-embed-script'}
      ></Script>
      <HtmlOembed html={html} />
    </>
  );
};

export default TwitterOembed;
