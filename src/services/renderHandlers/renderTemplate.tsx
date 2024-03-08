import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import logger from '@/utilities/logger';

import renderDefault from '@/components/templates/Default/DefaultWrapper';
import renderNoTemplate from '@/components/templates/NoTemplate/NoTemplateWrapper';

/**
 * A list of template components mapped to their respective render functions.
 * Each function takes an object with a `data` property of type `ComponentProps` and returns a `ReturnComponentRender`.
 */
const templateList: Record<string, (data: { data: ComponentProps }) => ReturnComponentRender> = {
  'No Template': renderNoTemplate,
  Default: renderDefault,
};

/**
 * Function to render a template based on the provided `StructureItem`.
 * It uses the `key.id` of the `StructureItem` to find the corresponding render function in `templateList`.
 * If a render function is found, it is called with the `StructureItem` and optional `variables`, `metadata`, and `previewToken`.
 * If no render function is found, an error is logged and `null` is returned.
 *
 * @param {StructureItem} item - The structure item to render.
 * @param {Variable[] | null} [variables] - Optional variables to pass to the render function.
 * @param {Metadata[] | null} [metadata] - Optional metadata to pass to the render function.
 * @param {string | null} [previewToken] - Optional preview token to pass to the render function.
 * @returns {ReturnComponentRender} - The rendered component or `null` if no render function was found.
 */
export const renderTemplate = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null,
  previewToken?: string | null
): ReturnComponentRender => {
  const render = templateList[item.key.id];
  if (render) {
    return render({ data: { ...item, variables, metadata, previewToken } as ComponentProps });
  }
  logger.log(`Cannot render template ${item.key.id}`, LoggerLevel.error);
  return null;
};
