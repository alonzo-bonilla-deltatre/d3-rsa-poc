import { getSrcFromMarkup } from '@/helpers/storyPartsHelper';
import { StoryPart } from '@/models/types/storyPart';
import YouTubeOembed from '@/components/commons/Oembed/YouTubeOembed';
import HtmlOembed from '@/components/commons/Oembed/HtmlOembed';

type OembedProps = {
  entity?: StoryPart;
};

const Oembed = ({ entity }: OembedProps) => {
  if (!entity) return null;
  const content = entity?.content;
  let src = undefined;
  let isYouTubeOembed = false;
  let html = content['html'];

  if (content['provider_name'] && content['provider_name'].toLowerCase() === 'youtube') {
    src = getSrcFromMarkup(content['html']);
    isYouTubeOembed = true;
  }

  if (content['provider_name'] && content['provider_name'].toLowerCase() === 'facebook') {
    html = html.replace('data-width="552"', 'data-width="350"');
  }

  return (
    <>{isYouTubeOembed && src ? <YouTubeOembed src={src}></YouTubeOembed> : <HtmlOembed html={html}></HtmlOembed>}</>
  );
};

export default Oembed;
