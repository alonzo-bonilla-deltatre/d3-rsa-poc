import { ComponentProps, EditorialListModuleProps, HeaderTitleProps } from '@/models/types/components';
import { getEntity, getSelection } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import FeaturedCarouselView from '@/components/modules/FeaturedCarousel/FeaturedCarouselView';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import { CardsType } from '@/components/commons/cards';

type FeaturedVideoListCarouselProps = EditorialListModuleProps & HeaderTitleProps;

const FeaturedVideoListCarousel = async ({ data }: { data: ComponentProps }) => {
  const {
    selectionSlug,
    skip,
    limit,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    description,
    sponsorBy,
  } = data.properties as FeaturedVideoListCarouselProps;

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
  const sponsor = sponsorBy
    ? await getEntity(ForgeDapiEntityCode.partners, sponsorBy, {
      variables: data.variables,
    })
    : null;
  const featuredSponsor = sponsor?.fields?.partnerLogo ? await getSingleAssetByTag(sponsor.fields.partnerLogo) : null;

  const featuredCarouselViewUniqueId = selectionSlug ?? '';

  if (!items?.length) return null;

  return (
    <ModuleContainer>
      <FeaturedCarouselView
        data={{
          items: items,
          cardsType: CardsType.VideoCard,
          headerTitle: headerTitle,
          headerTitleHeadingLevel: headerTitleHeadingLevel,
          hideHeaderTitle: hideHeaderTitle,
          featuredDescription: featuredDescription?.fields?.body,
          featuredSponsor: featuredSponsor,
          uniqueId: featuredCarouselViewUniqueId,
          hasPagination: false,
          hasNavigation: true,
        }}
      />
    </ModuleContainer>
  );
};

export default FeaturedVideoListCarousel;
