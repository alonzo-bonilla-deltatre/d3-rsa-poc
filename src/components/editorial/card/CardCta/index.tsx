import SvgIcon from "@/components/common/SvgIcon";

type CardCtaProps = {
  url: string;
  text: string | null;
  isExternal: boolean;
  style: string;
  icon: string;
  hide: boolean;
};


const CardCta = ({ ...props }: CardCtaProps) => {
  const displayText = props.text ? props.text: "read-more";
  const iconSize = 20;
  var additionalAttributes = {
    ...(props.isExternal ? { target: "blank" } : undefined)
  }
  return props.url && !props.hide ? (
    <>
    <a
      href={props.url}
      title = {displayText}
      className={getCtaClasses(props.style)}
      {...additionalAttributes}
    >{
      props.icon && (<SvgIcon src={props.icon} width={iconSize} height={iconSize} alt={displayText}></SvgIcon>)
    }
      {displayText}
    </a></>
  ) : <></>;
};

export default CardCta;

export const getCtaClasses = (style: string) => {
  switch (style) {
    case "default":
      return "inline-block text-white bg-[#EE3123] font-bold uppercase px-8 py-3 rounded-full outline-none";
    case "reverse":
      return "inline-block text-black bg-white font-bold uppercase px-8 py-3 rounded-full outline-none";
    default:
      return "inline-block text-white bg-[#EE3123] font-bold uppercase px-8 py-3 rounded-full outline-none";
  }
};
