import { ComponentProps, EditorialListModuleProps, FeaturedHeaderTitleProps } from '@/models/types/components';
import { getEntity, getEntityList } from '@/services/forgeDistributionService';
import GridComponent from '@/components/commons/list/Grid/Grid';
import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import FeaturedRow from '@/components/commons/FeaturedRow/FeaturedRow';
import { getSingleAssetByTag } from '@/services/gadService';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { CardsType } from '@/components/commons/cards';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

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
    isFullWidth,
  } = data.properties as EditorialListModuleProps & FeaturedHeaderTitleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

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
    skip: getNumberProperty(skip, 0),
    limit: getNumberProperty(limit, 6),
    variables: data.variables,
  })) as DistributionEntity[] | null;

  if (!items?.length) return null;

  return (
    <ModuleContainer isFullWidth={getBooleanProperty(isFullWidth)}>
      <FeaturedRow
        data={{
          headerTitle: headerTitle,
          headerTitleHeadingLevel: headerTitleHeadingLevel,
          hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
          featuredDescription: featuredDescription?.fields?.body,
          featuredSponsor: featuredSponsor,
          children: (
            <GridComponent
              items={items}
              itemsPerRow={3}
              cardsType={CardsType.VideoCard}
            />
          ),
        }}
      />
    </ModuleContainer>
  );
};

export default FeaturedVideoList;
