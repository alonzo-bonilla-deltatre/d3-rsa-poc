'use client';

import { PostPartProps, Widget } from '@d3-forge/d3-liveblog-widget';
import DivaVideoPlayer from '@/components/commons/DivaVideoPlayer/DivaVideoPlayer';
import { memo } from 'react';

type LiveBloggingClientProps = {
  blogData: any;
};

const ForgeDivaPostPart = ({ content }: PostPartProps) => {
  const description =
    content?.description || content?.headline || content?.summary || content?.fields?.description || '';

  return (
    <div className="d3lb-forge">
      <div className="d3lb-forge__inner">
        {content?.title && <div className={'d3lb-forge__title'}>{content.title}</div>}
        <DivaVideoPlayer entity={content} />
        {description && <div className={'d3lb-forge__description'}>{description}</div>}
      </div>
    </div>
  );
};

const LiveBloggingClient = ({ blogData }: LiveBloggingClientProps) => {
  return (
    <Widget
      {...blogData}
      customizations={{
        postParts: {
          'forge-divavideo': memo(ForgeDivaPostPart) as typeof ForgeDivaPostPart,
        },
      }}
    />
  );
};
export default LiveBloggingClient;
