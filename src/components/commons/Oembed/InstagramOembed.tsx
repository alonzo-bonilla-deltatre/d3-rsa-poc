'use client';

import React, { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';
import Script from 'next/script';

type OembedProps = {
  html: string;
};

const InstagramOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    (window as any)?.instgrm?.Embeds?.process();
  }, []);

  if (!html) return null;

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy={'beforeInteractive'}
        id={'instagram-embed-script'}
      ></Script>
      <HtmlOembed html={html} />
    </>
  );
};

export default InstagramOembed;
