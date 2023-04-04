import { LoggerLevel } from "@/models/types/logger";
import logger from "@/utilities/logger";
import { StoryPart } from "@/models/types/storyPart";
/* */
import { renderMarkdownStoryPart } from "@/components/editorial/storyparts/Markdown";
import { renderPhotoStoryPart } from "@/components/editorial/storyparts/PhotoPart";
import renderBrightcoveVideoStoryPart from "@/components/editorial/storyparts/BrightcoveVideo";

const storyPartList: Record<any, (item: StoryPart) => React.ReactElement> = {
  "markdown": renderMarkdownStoryPart,
  "photo": renderPhotoStoryPart,
  "customentity.brightcovevideo": renderBrightcoveVideoStoryPart,
};

export const renderStoryPart = (item: StoryPart): React.ReactElement => {
  let storyPartType = item.type;
  if(storyPartType == "customentity"){
    storyPartType = `customentity.${item.entityCode}`
  }
  const renderStoryPart = storyPartList[storyPartType];
  if (renderStoryPart) {
    return renderStoryPart({ ...item } as StoryPart);
  }
  logger.log(`Cannot render STORY PART ${storyPartType}`, LoggerLevel.error);
  return <span key={nanoid()}>{`STORY PART TYPE: "${storyPartType}" NOT IMPLEMENTED`}</span>;
};
