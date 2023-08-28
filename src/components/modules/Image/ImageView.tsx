import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import Image from 'next/image';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import { ImageTransformations } from '@/models/types/images';
import { DistributionEntity } from '@/models/types/forge';

type ModuleProps = {
  link?: string;
  linkCssClass?: string;
  imageContainerCssClass?: string;
  imageTransformation?: ImageTransformations;
  imageEntity?: DistributionEntity;
  asset?: GraphicAssetsDashboardItem;
  caption?: string;
};

const ImageView = ({ ...props }: ModuleProps) => {
  return props.imageEntity && props.asset && props.imageTransformation ? (
    <a
      href={props.link ?? ''}
      className={props.linkCssClass ?? ''}
    >
      <figure className={`col-start-1 row-start-1 grid-element relative ${props.imageContainerCssClass ?? ''}`}>
        <Image
          width={props.imageTransformation.mobileWidth}
          height={props.imageTransformation.mobileHeight}
          alt={props.imageEntity?.fields.altText?.toString() ?? props.imageEntity.title}
          className={`w-full h-full object-cover`}
          src={getSrcWithTransformation(props.asset.assetUrl, props.imageTransformation.desktop)}
          sizes="100vw"
          style={{
            width: `${props.imageTransformation.mobileWidth}px`,
            height: 'auto',
          }}
          loading={'lazy'}
        />
      </figure>
      {props.caption && <p className="mt-8 mb-3">{props.caption}</p>}
    </a>
  ) : (
    <div />
  );
};

export default ImageView;
