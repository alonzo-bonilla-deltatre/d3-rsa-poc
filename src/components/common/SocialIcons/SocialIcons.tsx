import SvgIcon from '@/components/common/SvgIcon/SvgIcon';
import { FacebookRounded, InstagramRounded, TwitterRounded, YouTubeRounded } from '@/components/icons';

export type SocialIconsProps = {
  hide?: boolean;
  size?: number;
  className?: string | '';
};

const SocialIcons = ({ ...props }: SocialIconsProps) => {
  return !props.hide ? (
    <>
      <SvgIcon
        className={props.className}
        size={props.size}
        icon={FacebookRounded}
      ></SvgIcon>
      <SvgIcon
        className={props.className}
        size={props.size}
        icon={YouTubeRounded}
      ></SvgIcon>
      <SvgIcon
        className={props.className}
        size={props.size}
        icon={InstagramRounded}
      ></SvgIcon>
      <SvgIcon
        className={props.className}
        size={props.size}
        icon={TwitterRounded}
      ></SvgIcon>
    </>
  ) : (
    <></>
  );
};

export default SocialIcons;
