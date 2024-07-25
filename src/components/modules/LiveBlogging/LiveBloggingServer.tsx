import LiveBloggingClient from '@/components/modules/LiveBlogging/LiveBloggingClient';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { ComponentProps } from '@/models/types/components';
import { fetchData } from '@d3-forge/d3-liveblog-widget/server';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ParamsType } from '@d3-forge/d3-liveblog-widget';
import '@d3-forge/d3-liveblog-widget/style';
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { notFound } from 'next/navigation';

type LiveBloggingServerProps = {
  slug?: string;
};

const LiveBloggingServer = async ({ data }: { data: ComponentProps }) => {
  const props = data.properties as LiveBloggingServerProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const postId = getDataVariable(data.variables, 'postid');
  const pageUrl = getDataVariable(data.variables, 'pageUrl');
  const params: ParamsType = {
    dapi_url: process.env.LIVE_BLOGGING_DAPI_BASE_URL ?? '',
    page_url: pageUrl,
    blog_slug: props.slug ?? '',
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

  return <LiveBloggingClient blogData={blogData} />;
};

export default LiveBloggingServer;
