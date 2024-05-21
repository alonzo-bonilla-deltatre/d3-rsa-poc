'use client';

import { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';

type OembedProps = {
  html: string;
};

const InstagramOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    const scriptId = 'instagram-embed-script';

    const initializeInstagramEmbeds = () => {
      const instagram = (window as any).instagram;
      if (instagram?.Embeds) {
        instagram.Embeds.process();
      } else {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = '//www.instagram.com/embed.js';
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => {
            const instagram = (window as any).instagram;
            instagram?.Embeds?.process();
          };
        }
      }
    };

    initializeInstagramEmbeds();

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [html]);

  return html ? <HtmlOembed html={html} /> : <></>;
};

export default InstagramOembed;
