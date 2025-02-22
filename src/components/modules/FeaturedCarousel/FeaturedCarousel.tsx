﻿import { ComponentProps, EditorialListModuleProps, FeaturedHeaderTitleProps } from '@/models/types/components';
import { getEntity, getSelection } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import FeaturedCarouselView from '@/components/modules/FeaturedCarousel/FeaturedCarouselView';
import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import { CardsType } from '@/components/commons/cards';

type FeaturedCarouselProps = EditorialListModuleProps & FeaturedHeaderTitleProps;

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
    isFullWidth,
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

  const featuredCarouselViewUniqueId = selectionSlug ?? '';

  if (!items?.length) return null;

  return (
    <FeaturedCarouselView
      data={{
        items: items,
        isFullWidth: getBooleanProperty(isFullWidth),
        cardsType: CardsType.DefaultCard,
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        featuredDescription: featuredDescription?.fields?.body,
        featuredSponsor: featuredSponsor,
        uniqueId: featuredCarouselViewUniqueId,
        hasPagination: false,
        hasNavigation: true,
      }}
    />
  );
};
export default FeaturedCarousel;
