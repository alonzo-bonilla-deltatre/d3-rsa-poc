import SectionWithHeader from '@/components/common/SectionWithHeader/SectionWithHeader';
import { containerCssSize, getImageContainerCssClass, getLinkCssClass } from '@/components/modules/Image/ImageHelper';
import ImageView from '@/components/modules/Image/ImageView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty, getDarkClass } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { getEntity } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { ImageTransformationName } from '@/models/types/images';

type ImageProps = {
  slug?: string;
  ratio?: string;
  size?: string;
  alignment?: string;
} & EditorialModuleProps;

const Image = async ({ data }: { data: ComponentProps }) => {
  const { isFullWidth, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, slug, ratio, size, alignment, isDark } =
    data.properties as ImageProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const imageEntity = await getEntity(ForgeDapiEntityCode.pageBuilderGadAssets, slug, {
    variables: data.variables,
  });
  const asset = (await getSingleAssetByTag(imageEntity?.fields.tag?.toString())) as GraphicAssetsDashboardItem;
  const ratio_size = `${ratio ? ratio : 'landscape'}_${size ? size : 'large'}`;
  const transformationValue = `${'image_' + ratio_size}` as unknown as ImageTransformationName;
  const transformationKey = Object.keys(ImageTransformationName).find(
    (key) => ImageTransformationName[key as keyof typeof ImageTransformationName] === transformationValue
  );

  let imageTransformation = transformations[transformationValue as ImageTransformationName];
  // if (transformationKey !== undefined) {
  //   imageTransformation = transformations[transformationKey as ImageTransformationName];
  // }

  const link = imageEntity?.fields.clickThroughUrl?.toString() ?? '#nolink';
  const caption = imageEntity?.fields.caption?.toString() ?? '';

  if (!imageEntity || !asset || !imageTransformation) return null;

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-image ${isFullWidth ? '-full-width' : ''} ${getDarkClass(isDark)}`,
        children: (
          <ImageView
            link={link}
            linkCssClass={`${getLinkCssClass(alignment)}`}
            imageContainerCssClass={`${getImageContainerCssClass(alignment)} ${containerCssSize[ratio_size]}`}
            imageTransformation={imageTransformation}
            imageEntity={imageEntity}
            asset={asset}
            caption={caption}
          />
        ),
      }}
    />
  );
};

export default Image;
