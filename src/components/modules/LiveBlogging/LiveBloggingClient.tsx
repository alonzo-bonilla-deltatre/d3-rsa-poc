'use client';

import { Widget } from '@d3-forge/d3-liveblog-widget';

type LiveBloggingClientProps = {
  blogData: any;
};

const labels = {
  key_moments_title: 'Key Moments!!!',
  hero_updated_label: 'Updated!!!',
  btn_load_more_label: 'Load more!!!',
  btn_new_content_label: 'New Updates!!!!',
  share_link_copied_label: 'Copied!!!',
};

const LiveBloggingClient = ({ blogData }: LiveBloggingClientProps) => {
  return (
    <Widget
      {...blogData}
      blogPageTitle={blogData?.config?.title}
      labels={labels}
    />
  );
};
export default LiveBloggingClient;
