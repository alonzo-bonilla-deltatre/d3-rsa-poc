'use client';

import React, { useEffect } from 'react';
import HtmlOembed from './HtmlOembed';
import Script from 'next/script';

type OembedProps = {
  html: string;
};

const TikTokOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    const tikTokList = Array.from(document.querySelectorAll('blockquote.tiktok-embed')).filter(
      (tt) => !tt.querySelector('iframe')
    );
    (window as any)?.tiktokEmbed?.lib?.render(tikTokList);
  }, []);

  if (!html) return null;

  return (
    <>
      <Script
        src="https://www.tiktok.com/embed.js"
        strategy={'beforeInteractive'}
        id={'tiktok-embed-script'}
      ></Script>
      <HtmlOembed html={html} />
    </>
  );
};

export default TikTokOembed;
