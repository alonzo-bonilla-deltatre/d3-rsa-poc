'use client';

import { PostPartProps, Widget } from '@d3-forge/d3-liveblog-widget';
import DivaVideoPlayer from '@/components/commons/DivaVideoPlayer/DivaVideoPlayer';
import { memo } from 'react';

type LiveBloggingClientProps = {
  blogData: any;
};

const ForgeDivaPostPart = ({ content }: PostPartProps) => {
  return <DivaVideoPlayer entity={content} />;
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
