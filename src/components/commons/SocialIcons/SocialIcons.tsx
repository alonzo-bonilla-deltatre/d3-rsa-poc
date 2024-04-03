import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { renderSvgIcon } from '@/components/icons';

export type SocialIconsProps = {
  hide?: boolean;
  size?: number;
  className?: string | '';
};

const SocialIcons = ({ className, size, hide }: SocialIconsProps) => {
  hide = getBooleanProperty(hide);
  if (hide) return null;
  return (
    <>
      {renderSvgIcon('FacebookRounded', { className: className, width: size, height: size })}
      {renderSvgIcon('YouTubeRounded', { className: className, width: size, height: size })}
      {renderSvgIcon('InstagramRounded', { className: className, width: size, height: size })}
      {renderSvgIcon('TwitterRounded', { className: className, width: size, height: size })}
    </>
  );
};

export default SocialIcons;
