import { Document as DocumentComponent } from '@/components/common/Document/Document';
import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { DistributionEntity, PagedResult } from '@/models/types/forge';
import { getEntityList } from '@/services/forgeDistributionService';
import { parseFieldValue } from '@/utilities/fieldValueParser';

const DocumentList = async ({ data }: { data: ComponentProps }) => {
  const {
    isFullWidth,
    isDark,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    ctaTitle,
    ctaLink,
    skip,
    limit,
    selectionSlug,
  } = data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) return null;

  const results = (await getEntityList(selectionSlug, null, {
    hasThumbnailPlaceholder: true,
    hasLinkRules: true,
    skip,
    limit,
    variables: data.variables,
    hasPagination: true,
  })) as PagedResult;

  const items = results?.items;
  if (!items?.length) return null;

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        ctaLink: parseFieldValue(ctaLink, data.variables),
        ctaTitle: ctaTitle,
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-document-list ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <div className="grid">
            {items?.map((entity: DistributionEntity) => {
              return (
                <DocumentComponent
                  key={entity.id ?? entity._translationId}
                  documentEntity={entity}
                  className="border transition duration-300 hover:text-accent hover:border-accent mb-2"
                  titleClassName="d3-ty-heading-6 min-w-0 break-words"
                  iconSize={40}
                />
              );
            })}
          </div>
        ),
      }}
    />
  );
};

export default DocumentList;
