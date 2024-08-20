import { StoryPart } from '@/models/types/storyPart';
import BrightcoveVideoPlayer from '@/components/commons/BrightcoveVideoPlayer/BrightcoveVideoPlayer';

const BrightcoveVideo = ({ data }: { data: StoryPart }) => {
  if (!data) {
    return null;
  }
  return (
    <BrightcoveVideoPlayer
      entity={data}
      containerCss="grid grid-cols-1 relative overflow-hidden w-full rounded-lg"
    />
  );
};

export default BrightcoveVideo;
