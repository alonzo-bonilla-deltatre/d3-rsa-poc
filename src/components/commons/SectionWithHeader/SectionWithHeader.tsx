import GadAsset from '@/components/commons/GadAsset/GadAsset';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import {
  getBooleanProperty,
  getOppositeBooleanProperty,
  getStringProperty,
} from '@/helpers/pageComponentPropertyHelper';
import { HeaderTitleProps } from '@/models/types/components';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { translate } from '@/helpers/translationHelper';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Typography from '@/components/commons/Typography/Typography';

export type SectionWithHeaderProps = {
  children?: ReactNode;
  topChildren?: ReactNode;
  additionalChildren?: ReactNode;
  featuredSponsor?: GraphicAssetsDashboardItem | null;
  sectionClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  hasBackground?: boolean;
  hasFullWidthHeader?: boolean;
  hasFullWidthContent?: boolean;
  removeSectionHtmlTag?: boolean;
  headerTitleAlignment?: string;
} & HeaderTitleProps;

const SectionWithHeader = ({ data }: { data: SectionWithHeaderProps }) => {
  const {
    children,
    topChildren,
    additionalChildren,
    featuredSponsor,
    sectionClassName,
    headerClassName,
    contentClassName,
    hasFullWidthContent,
    hasFullWidthHeader,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    ctaTitle,
    ctaLink,
    removeSectionHtmlTag,
  } = data;
  const showHeader =
    (!getBooleanProperty(hideHeaderTitle) && headerTitle) || additionalChildren || topChildren || featuredSponsor;
  const keepSectionTag =
    removeSectionHtmlTag === undefined && children ? getOppositeBooleanProperty(removeSectionHtmlTag) : false;
  const SectionContainer = `${!keepSectionTag ? 'div' : 'section'}` as keyof JSX.IntrinsicElements;

  return (
    <SectionContainer className={getStringProperty(sectionClassName)}>
      {showHeader && (
        <div
          className={twMerge(
            !getBooleanProperty(hasFullWidthHeader) ? 'container mx-auto' : 'px-2',
            getStringProperty(headerClassName)
          )}
        >
          <div className="flex flex-col gap-2 w-full">
            {topChildren && topChildren}
            <HeaderTitle
              headerTitle={headerTitle}
              headerTitleHeadingLevel={getStringProperty(headerTitleHeadingLevel?.toLowerCase()) ?? 'h2'}
              hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
              ctaTitle={ctaTitle}
              ctaLink={ctaLink}
              className={'mb-6'}
            ></HeaderTitle>
            {additionalChildren && additionalChildren}
          </div>
          {featuredSponsor && (
            <div className="flex flex-col gap-1 lg:flex-row">
              <Typography variant={'tag-m'}>{translate('presented-by')}</Typography>
              <GadAsset
                className="max-w-[200px] max-h-[80px] mx-auto"
                src={featuredSponsor.assetUrl}
                transformations={transformations.best_assets}
                title={translate('sponsored-logo')}
                height={200}
                width={200}
              ></GadAsset>
            </div>
          )}
        </div>
      )}
      {children && (
        <div
          className={twMerge(
            !getBooleanProperty(hasFullWidthContent) ? 'container mx-auto' : '',
            getStringProperty(contentClassName)
          )}
        >
          {children}
        </div>
      )}
    </SectionContainer>
  );
};

export default SectionWithHeader;
