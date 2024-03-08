import { getEntityList } from '@/services/forgeDistributionService';
import MatchesCard from '@/components/common/matches/MatchesCard/MatchesCard';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { Variable } from '@/models/types/pageStructure';

type MatchesListProps = {
  variables?: Variable[];
};

const MatchesList = async ({ variables }: MatchesListProps) => {
  const yesterdayItems = (await getEntityList(null, ForgeDapiEntityCode.matches, {
    hasLinkRules: true,
    variables: variables,
    tags: 'yesterday',
    hasReferencesFieldsInList: true,
  })) as DistributionEntity[] | null;
  const todayItems = (await getEntityList(null, ForgeDapiEntityCode.matches, {
    hasLinkRules: true,
    variables: variables,
    tags: 'today',
    hasReferencesFieldsInList: true,
  })) as DistributionEntity[] | null;
  const tomorrowItems = (await getEntityList(null, ForgeDapiEntityCode.matches, {
    hasLinkRules: true,
    variables: variables,
    tags: 'tomorrow',
    hasReferencesFieldsInList: true,
  })) as DistributionEntity[] | null;
  return (
    <MatchesCard
      yesterdayItems={yesterdayItems}
      todayItems={todayItems}
      tomorrowItems={tomorrowItems}
    ></MatchesCard>
  );
};

export default MatchesList;
