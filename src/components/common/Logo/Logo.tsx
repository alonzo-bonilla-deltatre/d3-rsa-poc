import { transformations } from '@/utilities/cloudinaryTransformations';
import GadAsset from '@/components/common/GadAsset/GadAsset';

type LogoProps = {
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  link?: string;
  assetUrl?: string;
};

const Logo = ({ ...props }: LogoProps) => {
  return props.assetUrl ? (
    <div
      className="flex items-center"
      role="presentation"
    >
      <GadAsset
        src={props.assetUrl}
        className="max-sm:w-full"
        title={props.alt}
        transformations={transformations.logos}
        width={props.width}
        height={props.height}
      ></GadAsset>
    </div>
  ) : (
    <></>
  );
};

export default Logo;
