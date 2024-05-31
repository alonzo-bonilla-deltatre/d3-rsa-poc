import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import { Metadata, StructureItem, Variable } from '@/models/types/pageStructure';

import renderAdv from '@/components/modules/Adv/AdvWrapper';
import renderAlbumListCarousel from '@/components/modules/AlbumListCarousel/AlbumListCarouselWrapper';
import renderAlbumMosaic from '@/components/modules/AlbumMosaic/AlbumMosaicWrapper';
import renderBrightcoveVideo from '@/components/modules/BrightcoveVideo/BrightcoveVideoWrapper';
import renderDivaVideo from '@/components/modules/DivaVideo/DivaVideoWrapper';
import renderFeaturedCarousel from '@/components/modules/FeaturedCarousel/FeaturedCarouselWrapper';
import renderFeaturedEventList from '@/components/modules/FeaturedEventList/FeaturedEventListWrapper';
import renderFeaturedMatches from '@/components/modules/FeaturedMatches/FeaturedMatchesWrapper';
import renderFeaturedMixedList from '@/components/modules/FeaturedMixedList/FeaturedMixedListWrapper';
import renderFeaturedPlayerListCarousel from '@/components/modules/FeaturedPlayerListCarousel/FeaturedPlayerListCarouselWrapper';
import renderFeaturedShopList from '@/components/modules/FeaturedShopList/FeaturedShopListWrapper';
import renderFeaturedVideoList from '@/components/modules/FeaturedVideoList/FeaturedVideoListWrapper';
import renderFeaturedVideoListCarousel from '@/components/modules/FeaturedVideoListCarousel/FeaturedVideoListCarouselWrapper';
import renderFocusOn from '@/components/modules/FocusOn/FocusOnWrapper';
import renderGraphicAsset from '@/components/modules/GraphicAsset/GraphicAssetWrapper';
import renderGridList from '@/components/modules/GridList/GridListWrapper';
import renderHeroSwiper from '@/components/modules/HeroSwiper/HeroSwiperWrapper';
import renderHtmlContent from '@/components/modules/HtmlContent/HtmlContentWrapper';
import renderImage from '@/components/modules/Image/ImageWrapper';
import renderJWPlayerVideo from '@/components/modules/JWPlayerVideo/JWPlayerVideoWrapper';
import renderLiveBlogging from '@/components/modules/LiveBlogging/LiveBloggingWrapper';
import renderMenu from '@/components/modules/Menu/MenuWrapper';
import renderPartners from '@/components/modules/Partners/PartnersWrapper';
import renderSearchResults from '@/components/modules/SearchResults/SearchResultsWrapper';
import renderStory from '@/components/modules/Story/StoryWrapper';
import renderText from '@/components/modules/Text/TextWrapper';
import renderYouTubeVideo from '@/components/modules/YouTubeVideo/YouTubeVideoWrapper';

/**
 * A list of module components mapped to their respective render functions.
 * Each function takes an object with a `data` property of type `ComponentProps` and returns a `ReturnComponentRender`.
 */
const componentList: Record<any, (data: { data: ComponentProps }) => ReturnComponentRender> = {
  Adv: renderAdv,
  AlbumListCarousel: renderAlbumListCarousel,
  AlbumMosaic: renderAlbumMosaic,
  BrightcoveVideo: renderBrightcoveVideo,
  DivaVideo: renderDivaVideo,
  FeaturedCarousel: renderFeaturedCarousel,
  FeaturedEventList: renderFeaturedEventList,
  FeaturedMatches: renderFeaturedMatches,
  FeaturedMixedList: renderFeaturedMixedList,
  FeaturedPlayerListCarousel: renderFeaturedPlayerListCarousel,
  FeaturedShopList: renderFeaturedShopList,
  FeaturedVideoList: renderFeaturedVideoList,
  FeaturedVideoListCarousel: renderFeaturedVideoListCarousel,
  FocusOn: renderFocusOn,
  GraphicAsset: renderGraphicAsset,
  GridList: renderGridList,
  Hero: renderHeroSwiper,
  HeroSwiper: renderHeroSwiper,
  HtmlContent: renderHtmlContent,
  Image: renderImage,
  JWPlayerVideo: renderJWPlayerVideo,
  LiveBlogging: renderLiveBlogging,
  Menu: renderMenu,
  Partners: renderPartners,
  SearchResults: renderSearchResults,
  Story: renderStory,
  Text: renderText,
  YouTubeVideo: renderYouTubeVideo,
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
