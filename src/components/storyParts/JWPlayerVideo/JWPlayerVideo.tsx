import { StoryPart } from '@/models/types/storyPart';
import JWPlayerVideoPlayer from '@/components/commons/JWPlayerVideoPlayer/JWPlayerVideoPlayer';

const JWPlayerVideo = ({ data }: { data: StoryPart }) => {
  if (!data) {
    return null;
  }
  return (
    <JWPlayerVideoPlayer
      entity={data}
      containerCss="grid grid-cols-1 relative overflow-hidden w-full rounded-lg"
    />
  );
};

export default JWPlayerVideo;
