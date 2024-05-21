import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import { LoggerLevel } from '@/models/types/logger';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
import logger from '@/utilities/loggerUtility';

import renderFooter from '@/components/layouts/Footer/FooterWrapper';
import renderDynamicGrid from '@/components/layouts/DynamicGrid/DynamicGridWrapper';
import renderHeader from '@/components/layouts/Header/HeaderWrapper';
import renderHeaderTransparent from '@/components/layouts/HeaderTransparent/HeaderTransparentWrapper';
import Hamburger from '@/components/layouts/Hamburger/HamburgerWrapper';
import renderSection from '@/components/layouts/Section/SectionWrapper';

/**
 * A list of layout components mapped to their respective render functions.
 * Each function takes an object with a `data` property of type `ComponentProps` and returns a `ReturnComponentRender`.
 */
const layoutList: Record<any, (data: { data: ComponentProps }) => ReturnComponentRender> = {
  Section: renderSection,
  Columns66: renderDynamicGrid('6-6'),
  Columns93: renderDynamicGrid('9-3'),
  Columns39: renderDynamicGrid('3-9'),
  Columns3333: renderDynamicGrid('3-3-3-3'),
  Columns444: renderDynamicGrid('4-4-4'),
  Columns363: renderDynamicGrid('3-6-3'),
  Columns282: renderDynamicGrid('2-8-2'),
  Header: renderHeader,
  HeaderTransparent: renderHeaderTransparent,
  Hamburger: Hamburger,
  Footer: renderFooter,
};

/**
 * Function to render a layout based on the provided `StructureItem`.
 * It uses the `key.id` of the `StructureItem` to find the corresponding render function in `layoutList`.
 * If a render function is found, it is called with the `StructureItem` and optional `variables`, `metadata`, and `previewToken`.
 * If no render function is found, an error is logged and `null` is returned.
 *
 * @param {StructureItem} item - The structure item to render.
 * @param {Variable[] | null} [variables] - Optional variables to pass to the render function.
 * @param {Metadata[] | null} [metadata] - Optional metadata to pass to the render function.
 * @param {string | null} [previewToken] - Optional preview token to pass to the render function.
 * @returns {ReturnComponentRender} - The rendered component or `null` if no render function was found.
 */
export const renderLayout = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null,
  previewToken?: string | null
): ReturnComponentRender => {
  const render = layoutList[item.key.id];
  if (render) {
    return render({ data: { ...item, variables, metadata, previewToken } as ComponentProps });
  }
  logger.log(`Cannot render layout ${item.key.id}`, LoggerLevel.error);
  return null;
};
