import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { ReactNode } from 'react';
import { icons, renderSvgIcon } from '@/components/icons';
import { getNumberProperty } from '@/helpers/pageComponentPropertyHelper';

type CallToActionContentProps = {
  text?: string | null;
  icon?: string;
  svgIcon?: ReactNode;
};

const CallToActionContent = ({ text, icon, svgIcon }: CallToActionContentProps) => {
  const displayText = text ? text : 'read-more';
  const iconSize = 20;

  return (
    <>
      <span className="relative">
        <TranslatedLabel translationTermKey={displayText} />
      </span>
      {renderSvgIcon(icon as keyof typeof icons, {
        width: getNumberProperty(iconSize, 80),
        height: getNumberProperty(iconSize, 80),
      })}
      {svgIcon}
    </>
  );
};

export default CallToActionContent;
