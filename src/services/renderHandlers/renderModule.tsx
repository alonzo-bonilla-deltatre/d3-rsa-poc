import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import renderGraphicAsset from '@/components/modules/GraphicAsset/GraphicAssetWrapper';
import renderHtmlContent from '@/components/modules/HtmlContent/HtmlContentWrapper';
import renderImage from '@/components/modules/Image/ImageWrapper';
import renderMenu from '@/components/modules/Menu/MenuWrapper';
import renderStory from '@/components/modules/Story/StoryWrapper';
import renderText from '@/components/modules/Text/TextWrapper';

/**
 * A list of module components mapped to their respective render functions.
 * Each function takes an object with a `data` property of type `ComponentProps` and returns a `ReturnComponentRender`.
 */
const componentList: Record<any, (data: { data: ComponentProps }) => ReturnComponentRender> = {
  GraphicAsset: renderGraphicAsset,
  HtmlContent: renderHtmlContent,
  Image: renderImage,
  Menu: renderMenu,
  Story: renderStory,
  Text: renderText,
};

/**
 * Function to render a module based on the provided `StructureItem`.
 * It uses the `key.id` of the `StructureItem` to find the corresponding render function in `componentList`.
 * If a render function is found, it is called with the `StructureItem` and optional `variables`, `metadata`, and `previewToken`.
 * If no render function is found, an error is logged and `null` is returned.
 *
 * @param {StructureItem} item - The structure item to render.
 * @param {Variable[] | null} [variables] - Optional variables to pass to the render function.
 * @param {Metadata[] | null} [metadata] - Optional metadata to pass to the render function.
 * @param {string | null} [previewToken] - Optional preview token to pass to the render function.
 * @returns {ReturnComponentRender} - The rendered component or `null` if no render function was found.
 */
export const renderModule = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null,
  previewToken?: string | null
): ReturnComponentRender => {
  const render = componentList[item.key.id];
  if (render) {
    return render({ data: { ...item, variables, metadata, previewToken, itemKey: item.key } as ComponentProps });
  }
  logger.log(`Cannot render module ${item.key.id}`, LoggerLevel.error);
  return null;
};
