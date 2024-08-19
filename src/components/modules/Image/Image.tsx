import { containerCssSize, getImageContainerCssClass, getLinkCssClass } from '@/components/modules/Image/ImageHelper';
import ImageView from '@/components/modules/Image/ImageView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { getEntity } from '@/services/forgeDistributionService';
import { getSingleAssetByTag } from '@/services/gadService';
import { ForgeDapiEntityCode } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { ImageTransformationName } from '@/models/types/images';

type ImageProps = {
  slug?: string;
  ratio?: string;
  size?: string;
  alignment?: string;
} & ModuleProps;

const Image = async ({ data }: { data: ComponentProps }) => {
  const { slug, ratio, size, alignment, isFullWidth } = data.properties as ImageProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const imageEntity = await getEntity(ForgeDapiEntityCode.pageBuilderGadAssets, slug, {
    variables: data.variables,
  });
  const asset = (await getSingleAssetByTag(imageEntity?.fields?.tag?.toString())) as GraphicAssetsDashboardItem;
  const ratio_size = `${ratio ? ratio : 'landscape'}_${size ? size : 'large'}`;
  const transformationValue = `${'image_' + ratio_size}` as unknown as ImageTransformationName;

  let imageTransformation = transformations[transformationValue as ImageTransformationName];

  const link = imageEntity?.fields?.clickThroughUrl?.toString() ?? '#nolink';
  const caption = imageEntity?.fields?.caption?.toString() ?? '';

  if (!imageEntity || !asset || !imageTransformation) return null;

  return (
    <ImageView
      link={link}
      linkCssClass={`${getLinkCssClass(alignment)}`}
      imageContainerCssClass={`${getImageContainerCssClass(alignment)} ${containerCssSize[ratio_size]}`}
      imageTransformation={imageTransformation}
      imageEntity={imageEntity}
      asset={asset}
      caption={caption}
      isFullWidth={getBooleanProperty(isFullWidth)}
      width={asset.width}
      height={asset.height}
    />
  );
};

export default Image;
