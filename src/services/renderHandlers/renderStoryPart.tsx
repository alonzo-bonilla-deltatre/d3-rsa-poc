import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/loggerUtility';
import { StoryPart } from '@/models/types/storyPart';
import { ReturnComponentRender } from '@/models/types/components';
import { ForgeEntityCode, ForgeEntityType, ForgeExternalEntityType } from '@/models/types/forge';

/**
 * Type definition for the keys of the `storyPartList` object.
 * It includes the `ForgeEntityType` values for markdown, photo, and album, the `ForgeEntityCode` values for Brightcove and Diva videos,
 * and the `ForgeExternalEntityType` values for oembed, quote, and table.
 */
type StoryPartListKey =
  | Extract<ForgeEntityType, ForgeEntityType.markdown | ForgeEntityType.photo | ForgeEntityType.album>
  | Extract<ForgeEntityCode, ForgeEntityCode.brightcoveVideo | ForgeEntityCode.divaVideo>
  | Extract<
      ForgeExternalEntityType,
      ForgeExternalEntityType.oembed | ForgeExternalEntityType.storyPartQuote | ForgeExternalEntityType.storyPartTable
    >;

/**
 * A list of story part components mapped to their respective render functions.
 * Each function takes a `StoryPart` and returns a `ReturnComponentRender`.
 */
const storyPartList: Record<StoryPartListKey, (item: StoryPart) => ReturnComponentRender> = {
  [ForgeEntityType.markdown]: () => null,
  [ForgeEntityType.photo]: () => null,
  [ForgeEntityType.album]: () => null,
  [ForgeEntityCode.brightcoveVideo]: () => null,
  [ForgeEntityCode.divaVideo]: () => null,
  [ForgeExternalEntityType.oembed]: () => null,
  [ForgeExternalEntityType.storyPartQuote]: () => null,
  [ForgeExternalEntityType.storyPartTable]: () => null,
};

/**
 * Function to render a story part based on the provided `StoryPart`.
 * It uses the `type`, `entityCode`, or `externalType` of the `StoryPart` to find the corresponding render function in `storyPartList`.
 * If a render function is found, it is called with the `StoryPart`.
 * If no render function is found, a warning is logged and `null` is returned.
 *
 * @param {StoryPart} item - The story part to render.
 * @returns {ReturnComponentRender} - The rendered component or `null` if no render function was found.
 */
export const renderStoryPart = (item: StoryPart): ReturnComponentRender => {
  let storyPartType = item.type;
  if (storyPartType == ForgeEntityType.customEntity) {
    storyPartType = `${item.entityCode}` as ForgeEntityType;
  }
  if (storyPartType == ForgeEntityType.external) {
    storyPartType = `${item.externalType}` as ForgeEntityType;
  }
  const renderStoryPart = storyPartList[storyPartType as StoryPartListKey];
  if (renderStoryPart) {
    return renderStoryPart({ ...item } as StoryPart);
  }
  logger.log(`Cannot render STORY PART ${storyPartType}`, LoggerLevel.warning);
  return null;
};
