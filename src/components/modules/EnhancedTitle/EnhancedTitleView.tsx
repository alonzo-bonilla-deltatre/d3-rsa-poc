import MenuList from '@/components/common/MenuList/MenuList';
import SectionWithHeader, { SectionWithHeaderProps } from '@/components/common/SectionWithHeader/SectionWithHeader';
import { WrapperWithBackgroundProps } from '@/components/common/WrapperWithBackground/WrapperWithBackground';
import { MenuSources } from '@/components/modules/Menu/Menu';
import { ModuleProps } from '@/models/types/components';
import { MenuItem } from '@/models/types/menu';

type EnhancedTitleViewProps = {
  className?: string;
  background?: WrapperWithBackgroundProps;
  menuItems?: MenuItem[];
  sectionWithHeader?: SectionWithHeaderProps;
  topChildren?: string | JSX.Element | JSX.Element[];
  additionalChildren?: string | JSX.Element | JSX.Element[];
} & ModuleProps;

const EnhancedTitleView = ({ data }: { data: EnhancedTitleViewProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    textAlignment,
    noTranslation,
    background,
    menuItems,
    sectionWithHeader,
    topChildren,
    additionalChildren,
  } = data as EnhancedTitleViewProps;

  const sectionWithHeaderData = {
    ...sectionWithHeader,
    headerTitle: headerTitle,
    headerTitleHeadingLevel: headerTitleHeadingLevel,
    hideHeaderTitle: hideHeaderTitle,
    headerTitleAlignment: textAlignment,
    noTranslation: noTranslation,
    background: background,
    topChildren: topChildren,
    additionalChildren: additionalChildren,
  };

  return (
    <>
      <SectionWithHeader data={sectionWithHeaderData} />

      {menuItems && menuItems.length > 0 && (
        <div className="d3-secondary-nav">
          <div className="d3-secondary-nav__container container max-lg:pr-0">
            <MenuList
              menuItems={menuItems}
              source={MenuSources.enhancedTitle}
              wrapperClassName="d3-secondary-nav__menu"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedTitleView;
