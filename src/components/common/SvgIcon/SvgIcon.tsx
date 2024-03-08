import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  size?: number;
  width?: number;
  height?: number;
  icon: React.ElementType;
}

type SvgExtraProps = {
  width: string;
  height: string;
};

const SvgIcon = ({ width = 24, height = 24, icon, size, ...svgProps }: IIconProps) => {
  // default
  const svgExtraProps = {
    width: `${width}px`,
    height: `${height}px`,
  };

  if (size !== undefined) {
    svgExtraProps.width = `${size}px`;
    svgExtraProps.height = `${size}px`;
  }

  const IconComp: React.ElementType = icon;
  return (
    <IconComp
      {...svgProps}
      {...svgExtraProps}
    />
  );
};

export default SvgIcon;
