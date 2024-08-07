import { ComponentProps, FeaturedHeaderTitleProps, ModuleProps } from '@/models/types/components';
import { getEntity } from '@/services/forgeDistributionService';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import FeaturedRow from '@/components/commons/FeaturedRow/FeaturedRow';
import { getSingleAssetByTag } from '@/services/gadService';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import MatchesList from '@/components/commons/matches/MatchesList/MatchesList';

const FeaturedMatches = async ({ data }: { data: ComponentProps }) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, description, sponsorBy, isFullWidth } =
    data.properties as FeaturedHeaderTitleProps & ModuleProps;

  const featuredDescription = description
    ? await getEntity(ForgeDapiEntityCode.pageBuilderTextEditors, description, {
        variables: data.variables,
      })
    : null;
  const sponsor = sponsorBy ? await getEntity(ForgeDapiEntityCode.partners, sponsorBy) : null;
  const featuredSponsor = sponsor?.fields?.partnerLogo ? await getSingleAssetByTag(sponsor.fields.partnerLogo) : null;

  return (
    <ModuleContainer isFullWidth={isFullWidth}>
      <FeaturedRow
        data={{
          headerTitle: headerTitle,
          headerTitleHeadingLevel: headerTitleHeadingLevel,
          hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
          featuredDescription: featuredDescription?.fields?.body,
          featuredSponsor: featuredSponsor,
          children: <MatchesList variables={data.variables}></MatchesList>,
        }}
      />
    </ModuleContainer>
  );
};
export default FeaturedMatches;
