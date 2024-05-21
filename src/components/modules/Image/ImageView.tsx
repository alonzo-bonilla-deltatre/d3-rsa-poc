import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageTransformations } from '@/models/types/images';
import { DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/commons/Picture/Picture';
import Link from '@/components/commons/Link/Link';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type ImageViewProps = {
  link?: string;
  linkCssClass?: string;
  imageContainerCssClass?: string;
  imageTransformation?: ImageTransformations;
  imageEntity?: DistributionEntity;
  asset?: GraphicAssetsDashboardItem;
  caption?: string;
  isFullWidth?: boolean;
  width?: number;
  height?: number;
};

const ImageView = ({
                     imageEntity,
                     imageTransformation,
                     imageContainerCssClass,
                     linkCssClass,
                     link,
                     asset,
                     caption,
                     isFullWidth,
                     width,
                     height,
                   }: ImageViewProps) => {
  if (!imageEntity || !asset || !imageTransformation) return null;

  return (
    <ModuleContainer isFullWidth={isFullWidth}>
      <Link
        href={link}
        className={`${linkCssClass ? linkCssClass + ' hover:text-current' : 'hover:text-current'}`}
      >
        <figure className={`col-start-1 row-start-1 grid-element relative ${imageContainerCssClass ?? ''}`}>
          <Picture
            alt={imageEntity?.fields?.altText?.toString() ?? imageEntity.title}
            src={asset.assetUrl}
            transformations={imageTransformation}
            className={`w-full h-full object-cover`}
            width={width}
            height={height}
          />
        </figure>
        {caption && <p className="mt-8 mb-3">{caption}</p>}
      </Link>
    </ModuleContainer>
  );
};

export default ImageView;
