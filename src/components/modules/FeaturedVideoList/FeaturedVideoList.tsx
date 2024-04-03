import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getEntity, getEntityList } from '@/services/forgeDistributionService';
import GridComponent from '@/components/commons/list/Grid/Grid';
import { getBooleanProperty, getDarkClass, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import FeaturedRow from '@/components/commons/FeaturedRow/FeaturedRow';
import { getSingleAssetByTag } from '@/services/gadService';
import { CardLayout, CardType } from '@/models/types/card';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

const FeaturedVideoList = async ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    skip,
    limit,
    selectionSlug,
    description,
    sponsorBy,
    isDark,
  } = data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const className = getDarkClass(isDark);
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

  const items = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit: getNumberProperty(limit, 6),
    variables: data.variables,
  })) as DistributionEntity[] | null;

  const cardType = CardType.Video;
  const cardLayout = CardLayout.Portrait;
  const cardDesign = getCardSettings(cardType, null, cardLayout);

  if (!items?.length) return null;

  return (
    <FeaturedRow
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        featuredDescription: featuredDescription?.fields?.body,
        featuredSponsor: featuredSponsor,
        sectionClassName: className,
        children: (
          <GridComponent
            items={items}
            itemsPerRow={3}
            cardDesign={cardDesign}
          />
        ),
      }}
    />
  );
};

export default FeaturedVideoList;
