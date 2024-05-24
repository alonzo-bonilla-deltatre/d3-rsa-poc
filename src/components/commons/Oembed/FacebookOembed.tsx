'use client';

import React, { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';

type OembedProps = {
  html: string;
};

const FacebookOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    const scriptId = 'facebook-embed-script';

    const initializeFacebookEmbeds = () => {
      const facebook = (window as any).facebook;
      if (facebook?.Embeds) {
        facebook.Embeds.process();
      } else {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = '//connect.facebook.net/en_US/sdk.js';
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => {
            const facebook = (window as any).facebook;
            facebook?.Embeds?.process();
          };
        }
      }
    };

    initializeFacebookEmbeds();

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [html]);

  if (!html) return null;

  return <HtmlOembed html={html} />;
};

export default FacebookOembed;
