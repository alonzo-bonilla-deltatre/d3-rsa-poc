import Image from "next/image";

type ImgIconProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const ImgIcon = ({ ...props }: ImgIconProps) => {
const src =  props.src;

  return props.src && props.width && (props.src.startsWith("/") || props.src.startsWith("http"))? (
    <>
    <Image
      width={props.width}
      height={props.height}
      alt={props.alt}
      src={src}
    />
    </>
  ) : null;
};

export default ImgIcon;