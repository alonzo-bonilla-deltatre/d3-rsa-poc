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
      const facebook = (window as any).FB;
      if (facebook?.FB) {
        facebook?.FB?.xfbml.parse();
      } else {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = '//connect.facebook.net/en_US/sdk.js';
          script.async = true;
          document.head.appendChild(script);

          script.onload = () => {
            const facebook = (window as any).FB;
            facebook.init({
              xfbml: true,
              version: 'v19.0',
            });
            facebook?.FB?.xfbml.parse();
          };
        }
      }
    };

    initializeFacebookEmbeds();
  }, [html]);

  if (!html) return null;

  return <HtmlOembed html={html} />;
};

export default FacebookOembed;
