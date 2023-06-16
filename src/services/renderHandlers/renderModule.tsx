/* instanbul ignore file */
import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { ComponentProps } from '@/models/types/components';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
/**/
import renderPromo from '@/components/modules/Promo/PromoWrapper';
import renderAdv from '@/components/modules/Adv/AdvWrapper';
import renderPromoGrid from '@/components/modules/PromoGrid/PromoGridWrapper';
import renderHero from '@/components/modules/Hero/HeroWrapper';
import renderCalendar from '@/components/modules/Calendar/CalendarWrapper';
import renderTestDetail from '@/components/modules/TestDetail/TestDetailWrapper';
import renderTestList from '@/components/modules/TestList/TestListWrapper';
import renderMosaicList from '@/components/modules/Mosaic/MosaicWrapper';
import renderMenu from '@/components/modules/Menu/MenuWrapper';
import renderStory from '@/components/modules/Story/StoryWrapper';
import renderPartners from '@/components/modules/Partners/PartnersWrapper';
import renderBrightcoveVideo from '@/components/modules/BrightcoveVideo/BrightcoveVideoWrapper';
import renderHtmlContent from '@/components/modules/HtmlContent/HtmlContentWrapper';
import renderEditorialList from '@/components/modules/EditorialList/EditorialListWrapper';
import renderGraphicAsset from '@/components/modules/GraphicAsset/GraphicAssetWrapper';
import renderSearchResults from '@/components/modules/SearchResults/SearchResultsWrapper';

import React from 'react';

const componentList: Record<any, (props: ComponentProps) => React.ReactElement> = {
  PocPromo: renderPromo,
  PocAdv: renderAdv,
  PocPromoGrid: renderPromoGrid,
  PocHero: renderHero,
  PocCalendar: renderCalendar,
  PocTestDetail: renderTestDetail,
  PocTestList: renderTestList,
  PocTestMosaic: renderMosaicList,
  PocMenu: renderMenu,
  PocPartners: renderPartners,
  PocBrightcoveVideo: renderBrightcoveVideo,
  PocEditorialList: renderEditorialList,

  // products-demo modules
  HtmlContent: renderHtmlContent,
  GraphicAsset: renderGraphicAsset,
  Hero: renderHero,
  Story: renderStory,
  Partners: renderPartners,
  BrightcoveVideo: renderBrightcoveVideo,
  Mosaic: renderMosaicList,
  EditorialList: renderEditorialList,
  Menu: renderMenu,
  Promo: renderPromo,
  SearchResults: renderSearchResults,
};

export const renderModule = (
  item: StructureItem,
  variables?: Variable[] | null,
  metadata?: Metadata[] | null,
  previewToken?: string | null
): React.ReactElement => {
  const render = componentList[item.key.id];
  if (render) {
    return render({ ...item, variables, metadata, previewToken } as ComponentProps);
  }
  logger.log(`Cannot render module ${item.key.id}`, LoggerLevel.error);
  return <div />;
};
