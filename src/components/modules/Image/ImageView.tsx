import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { ImageTransformations } from '@/models/types/images';
import { DistributionEntity } from '@/models/types/forge';
import Picture from '@/components/common/Picture/Picture';

type ImageViewProps = {
  link?: string;
  linkCssClass?: string;
  imageContainerCssClass?: string;
  imageTransformation?: ImageTransformations;
  imageEntity?: DistributionEntity;
  asset?: GraphicAssetsDashboardItem;
  caption?: string;
};

const ImageView = ({
  imageEntity,
  imageTransformation,
  imageContainerCssClass,
  linkCssClass,
  link,
  asset,
  caption,
}: ImageViewProps) => {
  if (!imageEntity || !asset || !imageTransformation) return null;

  return (
    <a
      href={link ?? ''}
      className={`${linkCssClass ? linkCssClass + ' hover:text-current' : ' hover:text-current'}`}
    >
      <figure className={`col-start-1 row-start-1 grid-element relative ${imageContainerCssClass ?? ''}`}>
        <Picture
          alt={imageEntity?.fields?.altText?.toString() ?? imageEntity.title}
          src={asset.assetUrl}
          transformations={imageTransformation}
          className={`w-full h-full object-cover`}
        />
      </figure>
      {caption && <p className="mt-8 mb-3">{caption}</p>}
    </a>
  );
};

export default ImageView;
