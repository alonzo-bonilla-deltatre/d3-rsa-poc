import Image from "next/image";

type SocialIconsProps = {
  author: string;
  size: number;
};


const SocialIcons = ({ ...props }: SocialIconsProps) => {

  return props.author ? (
    <><Image
      width={34}
      height={34}
      alt={"Facebook"}
      className={`mr-4 transition duration-300 hover:text-[#EE3123]`}
      src={"/icons/footer_facebook_logo.svg"} />
      <Image
        width={34}
        height={34}
        alt={"YouTube"}
        className={`mr-4`}
        src={"/icons/footer_youtube_logo.svg"} />
      <Image
        width={34}
        height={34}
        alt={"Instagram"}
        className={`mr-4`}
        src={"/icons/footer_instagram_logo.svg"} />
      <Image
        width={34}
        height={34}
        alt={"Twitter"}
        className={`mr-4`}
        src={"/icons/footer_twitter_logo.svg"} /></>
  ) : <></>;
};

export default SocialIcons;
