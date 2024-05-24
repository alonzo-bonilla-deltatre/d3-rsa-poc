'use client';

import React, { useEffect } from 'react';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';

type OembedProps = {
  html: string;
};

const TwitterOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  useEffect(() => {
    const scriptId = 'twitter-widgets-script';

    const loadTwitterWidgets = () => {
      const twttr = (window as any).twttr;
      if (twttr?.widgets) {
        twttr.widgets.load();
      } else {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = '//platform.twitter.com/widgets.js';
          script.async = true;
          document.body.appendChild(script);

          script.onload = () => {
            const twttr = (window as any).twttr;
            twttr?.widgets?.load();
          };
        }
      }
    };

    loadTwitterWidgets();

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

export default TwitterOembed;
