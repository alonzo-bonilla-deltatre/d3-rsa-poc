import Image from "next/image";

type SvgIconProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
};


const ImgIcon = ({ ...props }: SvgIconProps) => {
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


import {DetailedHTMLProps, HTMLAttributes} from "react";

interface IIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  size?: number
  color?: string
  icon: any
}

export const SvgIcon: React.FC<IIconProps> = (props) => {
  const { size, color, icon, style: styleArg, ...svgProps } = props
  let svgExtraProps: any = {}

  if (size !== undefined) {
    svgExtraProps.width = `${size}px`
    svgExtraProps.height = `${size}px`
  } else {
    // default
    svgExtraProps.width = '24px'
    svgExtraProps.height = '24px'
  }

  if (color !== undefined) {
    svgExtraProps.style = { color, ...styleArg }
  }
  const IconComp: any = icon
  return (
    <IconComp {...svgProps } {...svgExtraProps} />
  )
}

