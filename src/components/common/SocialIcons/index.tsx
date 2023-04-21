import SvgIcon from "@/components/common/SvgIcon";
import FacebookRounded from "@/components/icons/FacebookRounded";
import InstagramRounded from "@/components/icons/InstagramRounded";
import YouTubeRounded from "@/components/icons/YouTubeRounded";
import TwitterRounded from "@/components/icons/TwitterRounded";

export type SocialIconsProps = {
  hide: boolean;
  size: number;
  className: string;
};

const SocialIcons = ({...props}: SocialIconsProps) => {

  return !props.hide ? (
    <>
      <SvgIcon className={props.className} size={props.size} icon={FacebookRounded}></SvgIcon>
      <SvgIcon className={props.className} size={props.size} icon={YouTubeRounded}></SvgIcon>
      <SvgIcon className={props.className} size={props.size} icon={InstagramRounded}></SvgIcon>
      <SvgIcon className={props.className} size={props.size} icon={TwitterRounded}></SvgIcon>
    </>
  ) : <></>;
};

export default SocialIcons;
