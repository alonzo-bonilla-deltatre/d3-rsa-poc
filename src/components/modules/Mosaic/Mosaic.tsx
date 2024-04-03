import MosaicView from '@/components/commons/MosaicView/MosaicView';
import { ComponentProps, HeaderTitleProps } from '@/models/types/components';
import { getEntityList } from '@/services/forgeDistributionService';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { DistributionEntity } from '@/models/types/forge';
import { moduleIsNotValid } from '@/helpers/moduleHelper';

type MosaicProps = {
  skip?: number;
  limit?: number;
  selectionSlug?: string;
} & HeaderTitleProps;

const Mosaic = async ({ data }: { data: ComponentProps }) => {
  const { headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink, skip, limit, selectionSlug } =
    data.properties as MosaicProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const items = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit,
    variables: data.variables,
  })) as DistributionEntity[] | null;

  if (!items?.length) return null;

  return (
    <section className="mt-8">
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
        ctaTitle={ctaTitle}
        ctaLink={ctaLink}
      ></HeaderTitle>
      <MosaicView items={items}></MosaicView>
    </section>
  );
};

export default Mosaic;
