import { getSrcFromMarkup } from '@/helpers/storyPartsHelper';
import { StoryPart } from '@/models/types/storyPart';
import YouTubeOembed from '@/components/common/Oembed/YouTubeOembed';
import HtmlOembed from '@/components/common/Oembed/HtmlOembed';

type OembedProps = {
  entity?: StoryPart;
};

const Oembed = ({ ...props }: OembedProps) => {
  const { entity } = props as OembedProps;
  const content = entity?.content as any;
  let src = undefined;
  let isYouTubeOembed = false;

  if (content['provider_name'] && content['provider_name'].toLowerCase() === 'youtube') {
    src = getSrcFromMarkup(content['html']);
    isYouTubeOembed = true;
  }

  return entity ? (
    <>
      {isYouTubeOembed && src ? (
        <YouTubeOembed src={src}></YouTubeOembed>
      ) : (
        <HtmlOembed html={content['html']}></HtmlOembed>
      )}
    </>
  ) : (
    <></>
  );
};

export default Oembed;
