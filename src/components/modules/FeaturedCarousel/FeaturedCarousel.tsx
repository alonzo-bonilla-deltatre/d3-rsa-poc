import { CarouselProps, ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getEntity, getSelection } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import FeaturedCarouselView from '@/components/modules/FeaturedCarousel/FeaturedCarouselView';
import { getDarkClass, getNumberProperty, getOppositeBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardLayout, CardType } from '@/models/types/card';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import { ForgeDapiEntityCode } from '@/models/types/forge';

type FeaturedCarouselProps = EditorialModuleProps & CarouselProps;

const FeaturedCarousel = async ({ data }: { data: ComponentProps }) => {
  const {
    selectionSlug,
    skip,
    limit,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    description,
    sponsorBy,
    hideNavigation,
    hidePagination,
    isDark,
  } = data.properties as FeaturedCarouselProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const selection = await getSelection(selectionSlug, {
    skip: getNumberProperty(skip, 0),
    limit: getNumberProperty(limit, 5),
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    hasGadAssetsFields: true,
    variables: data.variables,
  });
  let items = selection?.items;

  const featuredDescription = description
    ? await getEntity(ForgeDapiEntityCode.pageBuilderTextEditors, description, {
        variables: data.variables,
      })
    : null;
  const sponsor = sponsorBy ? await getEntity(ForgeDapiEntityCode.partners, sponsorBy) : null;
  const featuredSponsor = sponsor?.fields?.partnerLogo ? await getSingleAssetByTag(sponsor.fields.partnerLogo) : null;
  const hasPagination = getOppositeBooleanProperty(hidePagination);
  const hasNavigation = getOppositeBooleanProperty(hideNavigation);

  const cardType = CardType.Media;
  const cardLayout = CardLayout.Portrait;
  const cardDesign = getCardSettings(cardType, null, cardLayout);

  const featuredCarouselViewUniqueId = selectionSlug ?? '';

  if (!items?.length) return null;

  return (
    <FeaturedCarouselView
      data={{
        items: items,
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        featuredDescription: featuredDescription?.fields.body,
        featuredSponsor: featuredSponsor,
        hasPagination: hasPagination,
        hasNavigation: hasNavigation,
        cardDesign: cardDesign,
        uniqueId: featuredCarouselViewUniqueId,
        className: getDarkClass(isDark),
      }}
    />
  );
};
export default FeaturedCarousel;
