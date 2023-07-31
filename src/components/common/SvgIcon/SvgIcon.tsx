import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IIconProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  size?: number;
  icon: React.ElementType;
}

type SvgExtraProps = {
  width: string;
  height: string;
};

const SvgIcon: React.FC<IIconProps> = (props) => {
  const { size, icon, ...svgProps } = props;
  // default
  let svgExtraProps: SvgExtraProps = {
    width: '24px',
    height: '24px',
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
