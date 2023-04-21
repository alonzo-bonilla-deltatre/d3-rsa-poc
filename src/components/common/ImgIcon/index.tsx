import Image from 'next/image';

type ImgIconProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
  ariaHidden?: boolean;
};

const ImgIcon = ({ ...props }: ImgIconProps) => {
  return props.src && props.width && (props.src.startsWith('/') || props.src.startsWith('http')) ? (
    <>
      <Image
        className={props.className}
        width={props.width}
        height={props.height}
        alt={props.alt}
        src={props.src}
        aria-hidden={props.ariaHidden}
      />
    </>
  ) : null;
};

export default ImgIcon;
