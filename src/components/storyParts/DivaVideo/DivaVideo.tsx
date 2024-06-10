import { StoryPart } from '@/models/types/storyPart';
import DivaVideoPlayer from '@/components/commons/DivaVideoPlayer/DivaVideoPlayer';

const DivaVideo = ({ data }: { data: StoryPart }) => {
  if (!data) {
    return null;
  }
  return (
    <DivaVideoPlayer
      entity={data}
      containerCss={'grid grid-cols-1 relative overflow-hidden w-full rounded-lg'}
    />
  );
};

export default DivaVideo;
