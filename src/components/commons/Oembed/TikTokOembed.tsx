'use client';

import { useEffect } from 'react';
import HtmlOembed from './HtmlOembed';

type OembedProps = {
  html: string;
};

const TikTokOembed = ({ ...props }: OembedProps) => {
  const { html} = props as OembedProps;
  
  useEffect(() => {
    const scriptId = 'tiktok-widgets-script';

    const loadTikTokWidgets = () => {
      if ((window as any)?.tiktokEmbed) {
        const tikTokList = Array.from(
          document.querySelectorAll('blockquote.tiktok-embed')
        ).filter((tt) => !tt.querySelector('iframe'));
        (window as any)?.tiktokEmbed?.lib?.render(tikTokList);
      } else {
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = 'https://www.tiktok.com/embed.js';
          document.head.appendChild(script);

          script.onload = () => {
            const tikTokList = Array.from(
              document.querySelectorAll('blockquote.tiktok-embed')
            ).filter((tt) => !tt?.querySelector('iframe'));
            (window as any)?.tiktokEmbed?.lib?.render(tikTokList);
          };
        }
      }
    };

    loadTikTokWidgets();
  }, []);

  if (!html) return null;

  return <HtmlOembed html={html} />;
};

export default TikTokOembed;
