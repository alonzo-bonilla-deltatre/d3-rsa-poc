import logger from '@/utilities/logger';
import { LoggerLevel } from '@/models/types/logger';
import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';
/*sorted and reviewed*/
import renderAccordion from '@/components/modules/Accordion/AccordionWrapper';
import renderAlbumList from '@/components/modules/AlbumList/AlbumListWrapper';
import renderAlbumListCarousel from '@/components/modules/AlbumListCarousel/AlbumListCarouselWrapper';
import renderAlbumMosaic from '@/components/modules/AlbumMosaic/AlbumMosaicWrapper';
import renderBrightcoveVideo from '@/components/modules/BrightcoveVideo/BrightcoveVideoWrapper';
import renderCta from '@/components/modules/Cta/CtaWrapper';
import renderDocumentList from '@/components/modules/DocumentList/DocumentListWrapper';
import renderEnhancedTitle from '@/components/modules/EnhancedTitle/EnhancedTitleWrapper';
import renderFeaturedGridList from '@/components/modules/FeaturedGridList/FeaturedGridListWrapper';
import renderFeaturedMatches from '@/components/modules/FeaturedMatches/FeaturedMatchesWrapper';
import renderFeaturedMixedList from '@/components/modules/FeaturedMixedList/FeaturedMixedListWrapper';
import renderFeaturedPlayerListCarousel from '@/components/modules/FeaturedPlayerListCarousel/FeaturedPlayerListCarouselWrapper';
import renderFeaturedShopList from '@/components/modules/FeaturedShopList/FeaturedShopListWrapper';
import renderFeaturedVideoListCarousel from '@/components/modules/FeaturedVideoListCarousel/FeaturedVideoListCarouselWrapper';
import renderFocusOn from '@/components/modules/FocusOn/FocusOnWrapper';
import renderGridList from '@/components/modules/GridList/GridListWrapper';
import renderHero from '@/components/modules/Hero/HeroWrapper';
import renderHeroStatic from '@/components/modules/HeroStatic/HeroStaticWrapper';
import renderHtmlContent from '@/components/modules/HtmlContent/HtmlContentWrapper';
import renderMenu from '@/components/modules/Menu/MenuWrapper';
import renderMixedList from '@/components/modules/MixedList/MixedListWrapper';
import renderPartners from '@/components/modules/Partners/PartnersWrapper';
import renderStory from '@/components/modules/Story/StoryWrapper';

import renderPromo from '@/components/modules/Promo/PromoWrapper';
import renderMosaicList from '@/components/modules/Mosaic/MosaicWrapper';
import renderGraphicAsset from '@/components/modules/GraphicAsset/GraphicAssetWrapper';
import renderSearchResults from '@/components/modules/SearchResults/SearchResultsWrapper';
import renderAlbum from '@/components/modules/Album/AlbumWrapper';
import renderFeaturedEventList from '@/components/modules/FeaturedEventList/FeaturedEventListWrapper';
import renderText from '@/components/modules/Text/TextWrapper';
import renderImage from '@/components/modules/Image/ImageWrapper';
import renderLiveBlogging from '@/components/modules/LiveBlogging/LiveBloggingWrapper';
import renderLiveBloggingGridList from '@/components/modules/LiveBloggingGridList/LiveBloggingGridListWrapper';
import renderFeaturedCarousel from '@/components/modules/FeaturedCarousel/FeaturedCarouselWrapper';
import renderFeaturedVideoList from '@/components/modules/FeaturedVideoList/FeaturedVideoListWrapper';
import renderAdv from '@/components/modules/Adv/AdvWrapper';
import renderDivaVideo from '@/components/modules/DivaVideo/DivaVideoWrapper';
import renderAdvertising from '@/components/modules/Advertising/AdvertisingWrapper';
import renderForm from '@/components/modules/Form/FormWrapper';

/**
 * A list of module components mapped to their respective render functions.
 * Each function takes an object with a `data` property of type `ComponentProps` and returns a `ReturnComponentRender`.
 */
const componentList: Record<any, (data: { data: ComponentProps }) => ReturnComponentRender> = {
  Accordion: renderAccordion,
  AlbumList: renderAlbumList,
  AlbumListCarousel: renderAlbumListCarousel,
  AlbumMosaic: renderAlbumMosaic,
  BrightcoveVideo: renderBrightcoveVideo,
  Cta: renderCta,
  DocumentList: renderDocumentList,
  EnhancedTitle: renderEnhancedTitle,
  FeaturedGridList: renderFeaturedGridList,
  FeaturedMatches: renderFeaturedMatches,
  FeaturedMixedList: renderFeaturedMixedList,
  FeaturedPlayerListCarousel: renderFeaturedPlayerListCarousel,
  FeaturedShopList: renderFeaturedShopList,
  FeaturedVideoListCarousel: renderFeaturedVideoListCarousel,
  FocusOn: renderFocusOn,
  GridList: renderGridList,
  Hero: renderHero,
  HeroStatic: renderHeroStatic,
  HtmlContent: renderHtmlContent,
  Menu: renderMenu,
  MixedList: renderMixedList,
  Partners: renderPartners,
  Story: renderStory,
  DivaVideo: renderDivaVideo,

  Adv: renderAdv,
  Advertising: renderAdvertising,
  Album: renderAlbum,
  GraphicAsset: renderGraphicAsset,
  FeaturedCarousel: renderFeaturedCarousel,
  FeaturedEventList: renderFeaturedEventList,

  FeaturedVideoList: renderFeaturedVideoList,
  Form: renderForm,

  Image: renderImage,
  LiveBlogging: renderLiveBlogging,
  LiveBloggingGridList: renderLiveBloggingGridList,
  Mosaic: renderMosaicList,
  Promo: renderPromo,
  SearchResults: renderSearchResults,
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
