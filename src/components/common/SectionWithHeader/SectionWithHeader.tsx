import GadAsset from '@/components/common/GadAsset/GadAsset';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import WrapperWithBackground, {
  WrapperWithBackgroundProps,
} from '@/components/common/WrapperWithBackground/WrapperWithBackground';
import {
  getBooleanProperty,
  getOppositeBooleanProperty,
  getStringProperty,
} from '@/helpers/pageComponentPropertyHelper';
import { HeaderTitleProps } from '@/models/types/components';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { translate } from '@/services/translationService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { ReactNode } from 'react';

export type SectionWithHeaderProps = {
  children?: ReactNode;
  topChildren?: ReactNode;
  additionalChildren?: ReactNode;
  featuredSponsor?: GraphicAssetsDashboardItem | null;
  sectionClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  background?: WrapperWithBackgroundProps;
  hasBackground?: boolean;
  hasFullWidthHeader?: boolean;
  hasFullWidthContent?: boolean;
  headerSubTitle?: string;
  removeSectionHtmlTag?: boolean;
  headerTitleAlignment?: string;
} & HeaderTitleProps;

const SectionWithHeader = ({ data }: { data: SectionWithHeaderProps }) => {
  const hasBackground = getBooleanProperty(data.hasBackground);

  return (
    <>
      {hasBackground ? (
        <WrapperWithBackground
          sizeClass="bg-cover"
          additionalClasses="bg-greyscale-dark"
          {...data.background}
        >
          {renderSection(data)}
        </WrapperWithBackground>
      ) : (
        renderSection(data)
      )}
    </>
  );
};

function renderSection(props: SectionWithHeaderProps) {
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
    noTranslation,
    typographyClassName,
    ctaTitle,
    ctaLink,
    removeSectionHtmlTag,
  } = props;

  const showHeader = (!hideHeaderTitle && headerTitle) || additionalChildren || topChildren || featuredSponsor;
  const keepSectionTag =
    removeSectionHtmlTag === undefined && children ? getOppositeBooleanProperty(removeSectionHtmlTag) : false;
  const SectionContainer = `${!keepSectionTag ? 'div' : 'section'}` as keyof JSX.IntrinsicElements;

  return (
    <SectionContainer className={`d3-section ${getStringProperty(sectionClassName)}`}>
      {showHeader && (
        <div
          className={`d3-section__header ${!hasFullWidthHeader ? 'container' : ''} ${getStringProperty(
            headerClassName
          )}`}
        >
          <div className="d3-section__header-info w-full">
            {topChildren && topChildren}
            <HeaderTitle
              className="d3-section__header-title"
              headerTitle={headerTitle}
              headerTitleHeadingLevel={headerTitleHeadingLevel}
              hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
              noTranslation={noTranslation}
              typographyClassName={typographyClassName}
              ctaTitle={ctaTitle}
              ctaLink={ctaLink}
            ></HeaderTitle>

            {additionalChildren && additionalChildren}
          </div>
          {featuredSponsor && (
            <div className="d3-section__sponsor">
              <span className="d3-ty-tag-small">{translate('presented-by')}</span>
              <GadAsset
                className="d3-section__sponsor-logo"
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
          className={`d3-section__content ${!hasFullWidthContent ? 'container' : ''} ${getStringProperty(
            contentClassName
          )}`}
        >
          {children}
        </div>
      )}
    </SectionContainer>
  );
}
export default SectionWithHeader;
