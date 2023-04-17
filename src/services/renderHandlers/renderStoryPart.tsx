import {LoggerLevel} from "@/models/types/logger";
import logger from "@/utilities/logger";
import {StoryPart} from "@/models/types/storyPart";
/* */
import {renderMarkdownStoryPart} from "@/components/storyParts/Markdown";
import {renderPhotoStoryPart} from "@/components/storyParts/PhotoPart";
import renderBrightcoveVideoStoryPart from "@/components/storyParts/BrightcoveVideo";
import renderOembedStoryPart from "@/components/storyParts/Oembed";
import renderQuoteStoryPart from "@/components/storyParts/Quote";
import renderTableStoryPart from "@/components/storyParts/Table";
import {nanoid} from "nanoid";

const storyPartList: Record<any, (item: StoryPart) => React.ReactElement> = {
  "markdown": renderMarkdownStoryPart,
  "photo": renderPhotoStoryPart,
  "customentity.brightcovevideo": renderBrightcoveVideoStoryPart,
  "external.oembed": renderOembedStoryPart,
  "external.story-part-quote": renderQuoteStoryPart,
  "external.story-part-table": renderTableStoryPart,
};

export const renderStoryPart = (item: StoryPart): React.ReactElement => {
  let storyPartType = item.type;
  if (storyPartType == "customentity") {
    storyPartType = `customentity.${item.entityCode}`
  }
  if (storyPartType == "external") {
    storyPartType = `external.${item.externalType}`
  }
  const renderStoryPart = storyPartList[storyPartType];
  if (renderStoryPart) {
    return renderStoryPart({...item} as StoryPart);
  }
  logger.log(`Cannot render STORY PART ${storyPartType}`, LoggerLevel.warning);
  return <span key={nanoid()}>{`STORY PART TYPE: "${storyPartType}" NOT IMPLEMENTED`}</span>;
};
