import BrightcoveVideoPlayer from '@/components/commons/BrightcoveVideoPlayer/BrightcoveVideoPlayer';
import { StoryPart } from '@/models/types/storyPart';

const BrightcoveVideo = ({ data }: { data: StoryPart }) => (
  <BrightcoveVideoPlayer
    entity={data}
    isStoryPart={true}
    containerCss={'grid grid-cols-1 relative overflow-hidden w-full pt-[56.25%] rounded-md'}
  />
);

export default BrightcoveVideo;
