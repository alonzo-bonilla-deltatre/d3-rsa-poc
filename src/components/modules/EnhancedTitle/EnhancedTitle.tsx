import { SectionWithHeaderProps } from '@/components/common/SectionWithHeader/SectionWithHeader';
import { WrapperWithBackgroundProps } from '@/components/common/WrapperWithBackground/WrapperWithBackground';
import EnhancedTitleView from '@/components/modules/EnhancedTitle/EnhancedTitleView';
import { getDataVariable } from '@/helpers/dataVariableHelper';
import { parseMenuItemFields, setActiveMenuItem } from '@/helpers/menuHelper';
import { getBooleanProperty, getDarkClass, getHideModule } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { LoggerLevel } from '@/models/types/logger';
import { MenuItem } from '@/models/types/menu';
import { getEntity } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import { getMenuStructure } from '@/services/menuService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { parseFieldValue } from '@/utilities/fieldValueParser';
import logger from '@/utilities/logger';
import { notFound } from 'next/navigation';
import {
  getGadAssetBgSizeClasses,
  getGradientClasses,
  getPhotoBgSizeClasses,
  setDefaultBackground,
  setGadAssetBackground,
  setPhotoBackground,
} from '@/components/modules/EnhancedTitle/EnhancedTitleHelpers';
import { ForgeDapiEntityCode } from '@/models/types/forge';

type EnhancedTitleProps = {
  slug?: string;
  hideBackground?: boolean;
  assetSlug?: string;
  path?: string;
  size?: string;
  noTranslation?: boolean;
  topChildren?: string | JSX.Element | JSX.Element[];
  additionalChildren?: string | JSX.Element | JSX.Element[];
} & ModuleProps;

const EnhancedTitle = async ({ data }: { data: ComponentProps }) => {
  const {
    headerTitle,
    headerTitleHeadingLevel,
    hideHeaderTitle,
    isDark,
    noTranslation,
    slug,
    hideBackground,
    path,
    topChildren,
    additionalChildren,
    textAlignment,
    size,
    assetSlug,
  } = data.properties as EnhancedTitleProps;

  if (getHideModule(data)) return null;

  let background = {} as WrapperWithBackgroundProps;
  const hasMenu = path && path.length > 0;
  let menuItems = {} as MenuItem[] | undefined;

  let headerSizeClasses = getGadAssetBgSizeClasses(size);
  const sectionWithHeader = {
    sectionClassName: headerSizeClasses,
  } as SectionWithHeaderProps;

  const hasNoBackground = getBooleanProperty(hideBackground);
  const hasPhotoBackground = slug && slug.length > 0 && !hasNoBackground;
  const hasAssetBackground = assetSlug && assetSlug.length > 0 && !hasPhotoBackground && !hasNoBackground;
  const hasDefaultBackground = !hasPhotoBackground && !hasAssetBackground && !hasNoBackground;

  //*********** HEADER WITH PHOTO BACKGROUND *********** */
  if (hasPhotoBackground) {
    const gradientClasses = getGradientClasses(textAlignment);
    const imageEntity = await getEntity(ForgeDapiEntityCode.photos, slug, {
      variables: data.variables,
    });
    if (imageEntity == null) {
      logger.log(`Cannot find Image entity as a background with slug ${slug} `, LoggerLevel.warning);
      notFound();
    } else {
      const imageTransformation = transformations.enhanced_title_background;
      headerSizeClasses = getPhotoBgSizeClasses(size);
      background = setPhotoBackground(
        imageEntity,
        imageTransformation,
        `${headerSizeClasses} ${gradientClasses}`,
        hasMenu
      );
      sectionWithHeader.sectionClassName = `dark ${headerSizeClasses}`;
      sectionWithHeader.hasBackground = true;
    }
  }

  //*********** HEADER WITH GAD ASSET BACKGROUND *********** */
  if (hasAssetBackground) {
    const imageTransformation = transformations.enhanced_title_background;
    const imageEntity = await getEntity(ForgeDapiEntityCode.pageBuilderGadAssets, assetSlug, {
      variables: data.variables,
    });
    const asset = (await getSingleAssetByTag(imageEntity?.fields.tag?.toString())) as GraphicAssetsDashboardItem;
    background = setGadAssetBackground(asset, imageTransformation, size);
    sectionWithHeader.hasBackground = true;
    sectionWithHeader.sectionClassName = `${getDarkClass(isDark)} ${headerSizeClasses}`;
  }
  if (hasDefaultBackground) {
    background = setDefaultBackground();
    sectionWithHeader.sectionClassName = headerSizeClasses;
    sectionWithHeader.hasBackground = true;
  }

  //*********** OTHER PROPERTIES *********** */
  if (hasNoBackground) {
    sectionWithHeader.sectionClassName = headerSizeClasses;
  }
  if (hasMenu) {
    const menuData = await getMenuStructure(parseFieldValue(path, data.variables), data.previewToken);

    if (menuData == null) {
      logger.log(`Cannot render Menu from path ${path}`, LoggerLevel.error);
      return null;
    }

    const items = parseMenuItemFields(menuData.data.items, data.variables);
    const pagePath = getDataVariable(data.variables, 'pagePath'); // this value has been set in page.tsx

    if (pagePath) setActiveMenuItem(items, pagePath);
    menuItems = items;
  }

  return (
    <EnhancedTitleView
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: hideHeaderTitle,
        textAlignment: textAlignment,
        noTranslation: noTranslation,
        background: background,
        menuItems: menuItems,
        sectionWithHeader: sectionWithHeader,
        topChildren: topChildren,
        additionalChildren: additionalChildren,
      }}
    />
  );
};
export default EnhancedTitle;
