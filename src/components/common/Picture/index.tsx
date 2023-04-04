import { ImageTransformations } from "@/models/types/images";
import { getSrcWithTransformation } from "@/utilities/cloudinaryTransformations";
import Image from "next/image";

type PictureProps = {
  src: string | "";
  width: number;
  height: number;
  alt: string;
  transformations: ImageTransformations;
  className?: string;
};

const Picture = ({ ...props }: PictureProps) => {
  const canRender = props.transformations;

  const desktopSrc = getSrcWithTransformation(props.src,props.transformations.desktop);
  const tabletSrc = getSrcWithTransformation(props.src,props.transformations.tablet);
  const mobileSrc = getSrcWithTransformation(props.src,props.transformations.mobile);

  return canRender ? (
    <picture>
      {props.transformations.desktop && (
        <source
          srcSet={desktopSrc} 
          media="(min-width: 64em)"
        ></source>
      )}
      {props.transformations.tablet && (
        <source
          srcSet={tabletSrc}
          media="(min-width: 40em)"
        ></source>
      )}
      <Image
        width={props.width}
        height={props.height}
        alt={props.alt}
        className={`max-w-none ${
          props.className ?? ""
        }`}
        src={mobileSrc}
      />
    </picture>
  ) : null;
};

export default Picture;
