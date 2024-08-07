import { getSrcFromMarkup } from '@/helpers/storyPartsHelper';
import { StoryPart } from '@/models/types/storyPart';
import YouTubeOembed from '@/components/commons/Oembed/YouTubeOembed';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';
import InstagramOembed from '@/components/commons/Oembed/InstagramOembed';
import TwitterOembed from '@/components/commons/Oembed/TwitterOembed';
import FacebookOembed from '@/components/commons/Oembed/FacebookOembed';
import TikTokOembed from '@/components/commons/Oembed/TikTokOembed';
import Script from 'next/script';

type OembedProps = {
  entity?: StoryPart;
};

const Oembed = ({ entity }: OembedProps) => {
  if (!entity) return null;
  const content = entity?.content as any;
  let src: string | undefined = undefined;
  let isYouTubeOembed = false;
  let html = content['html'];

  if (content['provider_name'] && content['provider_name'].toLowerCase() === 'youtube') {
    src = getSrcFromMarkup(content['html']);
    isYouTubeOembed = true;
  }

  const isTwitter = content['provider_name'] && content['provider_name'].toLowerCase() === 'twitter';
  const isInstagram = content['provider_name'] && content['provider_name'].toLowerCase() === 'instagram';
  const isTikTok = content['provider_name'] && content['provider_name'].toLowerCase() === 'tiktok';
  let isFacebook = false;

  if (content['provider_name'] && content['provider_name'].toLowerCase() === 'facebook') {
    html = html.replace('data-width="552"', 'data-width="350"');
    isFacebook = true;
  }

  const handleEmbeds = () => {
    switch (true) {
      case isYouTubeOembed:
        return <YouTubeOembed src={src!}></YouTubeOembed>;
      case isTwitter:
        return <TwitterOembed html={html}></TwitterOembed>;
      case isInstagram:
        return <InstagramOembed html={html}></InstagramOembed>;
      case isFacebook:
        return <FacebookOembed html={html}></FacebookOembed>;
      case isTikTok:
        return <TikTokOembed html={html}></TikTokOembed>;
      default:
        return <HtmlOembed html={html}></HtmlOembed>;
    }
  };

  return <>{handleEmbeds()}</>;
};

export default Oembed;
