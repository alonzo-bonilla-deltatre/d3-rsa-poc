import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageTransformations } from '@/models/types/images';
import { DistributionEntity } from '@/models/types/forge';
import Link from '@/components/commons/Link/Link';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Picture from '@/components/commons/Picture/Picture';

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
        <figure className={`grid-element relative col-start-1 row-start-1 ${imageContainerCssClass ?? ''}`}>
          <Picture
            alt={imageEntity?.fields?.altText?.toString() ?? imageEntity.title}
            src={asset.assetUrl}
            transformations={imageTransformation}
            className="h-full w-full object-cover"
            width={width}
            height={height}
          />
        </figure>
        {caption && <p className="mb-3 mt-8">{caption}</p>}
      </Link>
    </ModuleContainer>
  );
};

export default ImageView;
