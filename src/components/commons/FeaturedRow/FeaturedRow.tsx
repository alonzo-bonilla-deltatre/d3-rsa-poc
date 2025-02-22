import {
  getBooleanProperty,
  getOppositeBooleanProperty,
  getStringProperty,
} from '@/helpers/pageComponentPropertyHelper';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import React, { ReactHTML, ReactNode } from 'react';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { translate } from '@/helpers/translationHelper';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { HeaderTitleProps } from '@/models/types/components';
import { twMerge } from 'tailwind-merge';
import Typography from '@/components/commons/Typography/Typography';

export type FeaturedRowProps = {
  children?: string | ReactNode | ReactNode[];
  leftChildren?: React.ReactNode;
  featuredDescription?: string;
  featuredSponsor?: GraphicAssetsDashboardItem | null;
  sectionClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  hasFullWidth?: boolean;
  headerSubTitle?: string;
  removeSectionHtmlTag?: boolean;
} & HeaderTitleProps;

const FeaturedRow = ({ data }: { data: FeaturedRowProps }) => {
  const {
    children,
    leftChildren,
    featuredDescription,
    featuredSponsor,
    removeSectionHtmlTag,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    headerSubTitle,
    headerClassName,
    contentClassName,
    hasFullWidth,
    sectionClassName,
    ctaTitle,
    ctaLink,
  } = data;
  const showHeader = headerTitle || leftChildren || featuredDescription || featuredSponsor;
  const keepSectionTag =
    removeSectionHtmlTag === undefined && children ? getOppositeBooleanProperty(removeSectionHtmlTag) : false;
  const SectionContainer = `${!keepSectionTag ? 'div' : 'section'}` as keyof ReactHTML;

  return (
    <SectionContainer className={getStringProperty(sectionClassName)}>
      <div
        className={twMerge(
          'flex flex-col lg:grid lg:max-w-full lg:grid-cols-4 lg:gap-6',
          !getBooleanProperty(hasFullWidth) ? 'container' : ''
        )}
      >
        {showHeader && (
          <div
            className={twMerge(
              getStringProperty(headerClassName),
              'bg-bullets bg-no-repeat py-1 lg:relative lg:col-span-1 lg:row-span-1 lg:block lg:min-h-[381px] lg:columns-1 lg:bg-top lg:p-0 xl:py-4'
            )}
          >
            <div className="mb-6 flex md:justify-between">
              <div className="w-full">
                <HeaderTitle
                  headerTitle={headerTitle}
                  headerTitleHeadingLevel={getStringProperty(headerTitleHeadingLevel?.toLowerCase()) ?? 'h2'}
                  hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
                  className="mb-6"
                ></HeaderTitle>
                <div>
                  {featuredDescription && (
                    <Typography
                      variant="body-s"
                      className="mb-6 text-grey-100"
                    >
                      {featuredDescription}
                    </Typography>
                  )}
                  {featuredSponsor && (
                    <Typography
                      variant="tag-m"
                      className="mb-6 flex items-center uppercase text-white"
                    >
                      {translate('sponsored-by')}
                      <div className="ml-2 max-h-[30px] max-w-[30px] rtl:ml-0 rtl:mr-2">
                        <GadAsset
                          src={featuredSponsor.assetUrl}
                          height={30}
                          width={30}
                          transformations={transformations.best_assets}
                          title={translate('sponsored-logo')}
                          className="object-fill"
                        ></GadAsset>
                      </div>
                    </Typography>
                  )}
                  {leftChildren}
                </div>
              </div>
              {featuredSponsor && (
                <div className="absolute right-0 top-0 hidden lg:top-1/3 lg:flex rtl:left-0">
                  <GadAsset
                    src={featuredSponsor.assetUrl}
                    height={400}
                    width={400}
                    transformations={transformations.best_assets}
                    title={translate('sponsored-logo')}
                    className="opacity-[.10]"
                  ></GadAsset>
                </div>
              )}
            </div>
          </div>
        )}
        {children && (
          <div
            className={twMerge(
              getStringProperty(contentClassName),
              'py-1 lg:relative lg:col-span-3 lg:row-span-2 lg:block lg:columns-1 lg:rounded-md lg:p-0 xl:py-4 xl:pb-8'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </SectionContainer>
  );
};

export default FeaturedRow;
