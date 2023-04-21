import { ImageTransformations } from '@/models/types/images';
import { getSrcWithTransformation } from '@/utilities/cloudinaryTransformations';
import Image from 'next/image';

type GadAssetProps = {
  src: string | '';
  width: number;
  height: number;
  title: string;
  transformations: ImageTransformations;
  className?: string;
};

const GadAsset = ({ ...props }: GadAssetProps) => {
  const canRender = props.transformations;
  const desktopSrc = getSrcWithTransformation(props.src, props.transformations.desktop);

  return canRender ? (
    <Image
      className={props.className}
      src={desktopSrc}
      alt={props.title}
      width={props.width}
      height={props.height}
    />
  ) : null;
};

export default GadAsset;
