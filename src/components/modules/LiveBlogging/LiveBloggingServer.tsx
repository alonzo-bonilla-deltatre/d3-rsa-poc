import LiveBloggingClient from '@/components/modules/LiveBlogging/LiveBloggingClient';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { ComponentProps } from '@/models/types/components';
import { fetchData } from '@d3-forge/d3-liveblog-widget/server';
import { ParamsType } from '@d3-forge/d3-liveblog-widget';
import '@d3-forge/d3-liveblog-widget/style';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getBlogs } from '@/services/liveBloggingDistributionService';

type LiveBloggingServerProps = {
  slug?: string;
  tags?: string[];
  eventId?: string;
};

const LiveBloggingServer = async ({ data }: { data: ComponentProps }) => {
  const { slug, tags, eventId } = data.properties as LiveBloggingServerProps;
  let blogSlug = slug ?? '';
  if (!slug && !tags && !eventId) return null;

  if ((!slug && tags?.length) || (!slug && eventId)) {
    const blogs = await getBlogs({
      tags: tags?.toString(),
      eventId: eventId,
    });
    const blog = blogs?.[0] ?? null;
    blogSlug = blog?.slug ?? '';
  }

  if (!blogSlug) return null;

  const postId = getDataVariable(data.variables, 'postid');
  const pageUrl = getDataVariable(data.variables, 'pageUrl');
  const params: ParamsType = {
    dapi_url: process.env.LIVE_BLOGGING_DAPI_BASE_URL ?? '',
    page_url: pageUrl,
    blog_slug: blogSlug,
    culture: process.env.CULTURE ?? 'en-GB',
    pollingTimeout: 3000,
    post_id: postId,
    post_id_path: '/post/',
  };

  let blogData = null;
  try {
    blogData = await fetchData(params);
  } catch (error) {
    logger.log('Error fetching blog data:', LoggerLevel.error);
    return null;
  }

  if (!blogData) return null;

  // @ts-ignore
  if (blogData?.error) {
    // @ts-ignore
    logger.log(blogData?.error, LoggerLevel.warning);
    notFound();
  }

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        id="instagram-embed-script"
      ></Script>
      <LiveBloggingClient blogData={blogData} />
    </>
  );
};

export default LiveBloggingServer;
