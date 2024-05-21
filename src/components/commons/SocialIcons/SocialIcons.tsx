import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { renderSvgIcon } from '@/components/icons';

export type SocialIconsProps = {
  size?: number;
  className?: string;
};

const SocialIcons = ({ className = 'cursor-pointer text-gray-500 hover:text-link transition duration-300', size = 34 }: SocialIconsProps) => {
  return (
    <>
      {renderSvgIcon('FacebookRounded', { className: className, width: size, height: size })}
      {renderSvgIcon('YouTubeRounded', { className: className, width: size, height: size })}
      {renderSvgIcon('InstagramRounded', { className: className, width: size, height: size })}
      {renderSvgIcon('XRounded', { className: className, width: size, height: size })}
    </>
  );
};

export default SocialIcons;
