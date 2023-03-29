import { StoryPart } from "@/models/types/storyPart";
import { nanoid } from "nanoid";
import BrightcoveVideoPlayer from "../../../common/BrightcoveVideoPlayer";

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? <BrightcoveVideoPlayer key={nanoid()} entity={data} isStoryPart={true} /> : <></>;

export default renderStoryPart;