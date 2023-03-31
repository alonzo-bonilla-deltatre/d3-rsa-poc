import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import { ComponentProps } from "@/models/types/components";
import { StructureItem } from "@/models/types/pageStructure";
/**/
import renderPromo from "@/components/modules/Promo/PromoWrapper";
import renderAdv from "@/components/modules/Adv/AdvWrapper";
import renderPromoGrid from "@/components/modules/PromoGrid/PromoGridWrapper";
import renderHero from "@/components/modules/Hero/HeroWrapper";
import renderCalendar from "@/components/modules/Calendar/CalendarWrapper";
import renderTestDetail from "@/components/modules/TestDetail/TestDetailWrapper";
import renderTestList from "@/components/modules/TestList/TestListWrapper";
import renderTestMosaicList from "@/components/modules/TestMosaic/TestMosaicWrapper";
import renderMenu from "@/components/modules/Menu/MenuWrapper";
import renderStory from "@/components/modules/Story/StoryWrapper";
import renderPartners from "@/components/modules/Partners/PartnersWrapper";
import renderBrightcoveVideo from "@/components/modules/BrightcoveVideo/BrightcoveVideoWrapper";

const componentList: Record<
  any,
  (props: ComponentProps) => React.ReactElement
> = {
  Hero : renderHero,
  Story: renderStory,
  Partners: renderPartners,
  BrightcoveVideo: renderBrightcoveVideo
};

export const renderModule = (item: StructureItem): React.ReactElement => {
  const render = componentList[item.key.id];
  if (render) {
    return render({ ...item } as ComponentProps);
  }
  logger.log(`Cannot render module ${item.key.id}`, LoggerLevel.error);
  return <div/>;
};