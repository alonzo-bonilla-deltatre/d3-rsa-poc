import BrightcoveVideoPlayer from "@/components/common/BrightcoveVideoPlayer";
import { StoryPart } from "@/models/types/storyPart";
import { nanoid } from "nanoid";

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? <BrightcoveVideoPlayer key={nanoid()} entity={data} isStoryPart={true} /> : <></>;

export default renderStoryPart;