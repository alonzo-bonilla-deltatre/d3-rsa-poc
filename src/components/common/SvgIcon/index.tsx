import Image from "next/image";

type SvgIconProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
};


const SvgIcon = ({ ...props }: SvgIconProps) => {
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

export default SvgIcon;
