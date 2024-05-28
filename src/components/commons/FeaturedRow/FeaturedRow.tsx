import {
  getBooleanProperty,
  getOppositeBooleanProperty,
  getStringProperty,
} from '@/helpers/pageComponentPropertyHelper';
import HeaderTitle from '@/components/commons/HeaderTitle/HeaderTitle';
import React from 'react';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { translate } from '@/helpers/translationHelper';
import GadAsset from '@/components/commons/GadAsset/GadAsset';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import WrapperWithBackground, {
  WrapperWithBackgroundProps,
} from '@/components/commons/WrapperWithBackground/WrapperWithBackground';
import { HeaderTitleProps } from '@/models/types/components';
import { twMerge } from 'tailwind-merge';
import Typography from '@/components/commons/Typography/Typography';

export type FeaturedRowProps = {
  children?: string | JSX.Element | JSX.Element[];
  leftChildren?: React.ReactNode;
  featuredDescription?: string;
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
} & HeaderTitleProps;

const FeaturedRow = ({ data }: { data: FeaturedRowProps }) => {
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

function renderSection(props: FeaturedRowProps) {
  const {
    children,
    leftChildren,
    featuredSponsor,
    sectionClassName,
    headerClassName,
    contentClassName,
    hasFullWidthContent,
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    featuredDescription,
    removeSectionHtmlTag,
  } = props as FeaturedRowProps;

  const showHeader = headerTitle || leftChildren || featuredDescription || featuredSponsor;
  const keepSectionTag =
    removeSectionHtmlTag === undefined && children ? getOppositeBooleanProperty(removeSectionHtmlTag) : false;
  const SectionContainer = `${!keepSectionTag ? 'div' : 'section'}` as keyof JSX.IntrinsicElements;

  return (
    <SectionContainer className={getStringProperty(sectionClassName)}>
      <div
        className={twMerge(
          'flex flex-col lg:grid lg:grid-cols-4 lg:gap-6 lg:max-w-full',
          !hasFullWidthContent ? 'container' : ''
        )}
      >
        {showHeader && (
          <div
            className={twMerge(
              getStringProperty(headerClassName),
              'bg-bullets lg:bg-top lg:min-h-[381px] bg-no-repeat py-1 xl:py-4 lg:p-0 lg:block lg:relative lg:col-span-1 lg:row-span-1 lg:columns-1'
            )}
          >
            <div className={'flex md:justify-between mb-6'}>
              <div className="w-full">
                <HeaderTitle
                  headerTitle={headerTitle}
                  headerTitleHeadingLevel={getStringProperty(headerTitleHeadingLevel?.toLowerCase()) ?? 'h2'}
                  hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
                  className={'mb-6'}
                ></HeaderTitle>
                <div>
                  {featuredDescription && (
                    <Typography
                      variant={'body-s'}
                      className={'mb-6 text-grey-100'}
                    >
                      {featuredDescription}
                    </Typography>
                  )}
                  {featuredSponsor && (
                    <Typography
                      variant={'tag-m'}
                      className={'mb-6 uppercase flex items-center text-white'}
                    >
                      {translate('sponsored-by')}
                      <div className={'ml-2 rtl:ml-0 rtl:mr-2 max-w-[30px] max-h-[30px]'}>
                        <GadAsset
                          src={featuredSponsor.assetUrl}
                          height={30}
                          width={30}
                          transformations={transformations.best_assets}
                          title={translate('sponsored-logo')}
                          className={'object-fill'}
                        ></GadAsset>
                      </div>
                    </Typography>
                  )}
                  {leftChildren}
                </div>
              </div>
              {featuredSponsor && (
                <div className={'hidden lg:flex absolute top-0 lg:top-1/3 right-0 rtl:left-0'}>
                  <GadAsset
                    src={featuredSponsor.assetUrl}
                    height={400}
                    width={400}
                    transformations={transformations.best_assets}
                    title={translate('sponsored-logo')}
                    className={'opacity-[.10]'}
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
              'xl:pb-8 py-1 xl:py-4 lg:p-0 lg:block lg:relative lg:rounded-md lg:col-span-3 lg:row-span-2 lg:columns-1'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </SectionContainer>
  );
}

export default FeaturedRow;
