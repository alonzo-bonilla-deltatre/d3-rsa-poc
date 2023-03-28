import Image from "next/image";

type SocialIconsProps = {
  hide: boolean;
  size: number;
  className: string;
};


const SocialIcons = ({ ...props }: SocialIconsProps) => {

  return !props.hide ? (
    <><Image
      width={props.size}
      height={props.size}
      alt={"Facebook"}
      className={props.className}
      src={"/icons/footer_facebook_logo.svg"} />
      <Image
        width={props.size}
        height={props.size}
        alt={"YouTube"}
        className={props.className}
        src={"/icons/footer_youtube_logo.svg"} />
      <Image
        width={props.size}
        height={props.size}
        alt={"Instagram"}
        className={props.className}
        src={"/icons/footer_instagram_logo.svg"} />
      <Image
        width={props.size}
        height={props.size}
        alt={"Twitter"}
        className={props.className}
        src={"/icons/footer_twitter_logo.svg"} /></>
  ) : <></>;
};

export default SocialIcons;
