import YouTubeVideoPlayer from '@/components/commons/YouTubeVideoPlayer/YouTubeVideoPlayer';
import { StoryPart } from '@/models/types/storyPart';

const YouTubeVideo = ({ data }: { data: StoryPart }) => {
  if (!data) {
    return null;
  }
  return (
    <YouTubeVideoPlayer
      entity={data}
      containerCss="grid grid-cols-1 relative overflow-hidden w-full rounded-lg"
    />
  );
};

export default YouTubeVideo;
