'use client';

import React, { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';
import Script from 'next/script';

type OembedProps = {
  html: string;
};

const FacebookOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    (window as any)?.FB?.xfbml?.parse();
  }, []);

  if (!html) return null;

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy={'beforeInteractive'}
        id={'instagram-embed-script'}
      ></Script>
      <HtmlOembed html={html} />
    </>
  );
};

export default FacebookOembed;
