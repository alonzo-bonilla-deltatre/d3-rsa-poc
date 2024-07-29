'use client';

import React, { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';

type OembedProps = {
  html: string;
};

const InstagramOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    const scriptId = 'instagram-embed-script';

    const initializeInstagramEmbeds = () => {
      const instagram = (window as any).instgrm;
      if (instagram?.Embeds) {
        instagram.Embeds.process();
      } else {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = 'https://www.instagram.com/embed.js';
          document.head.appendChild(script);

          script.onload = () => {
            const instagram = (window as any).instgrm;
            instagram?.Embeds?.process();
          };
        }
      }
    };

    initializeInstagramEmbeds();
  }, [html]);

  if (!html) return null;

  return <HtmlOembed html={html} />;
};

export default InstagramOembed;
