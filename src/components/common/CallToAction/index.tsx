import ImgIcon from "@/components/common/ImgIcon";

type CallToActionProps = {
  url: string;
  text: string | null;
  isExternal: boolean;
  style: string;
  icon: string;
  hide: boolean;
};


const CallToAction = ({ ...props }: CallToActionProps) => {
  const displayText = props.text ? props.text: "read-more";
  const iconSize = 20;
  const additionalAttributes = {
    ...(props.isExternal ? {target: "blank"} : undefined)
  };
  return props.url && !props.hide ? (
    <>
    <a
      href={props.url}
      title = {displayText}
      className={getCtaClasses(props.style)}
      {...additionalAttributes}
    >{
      props.icon && (<ImgIcon src={props.icon} width={iconSize} height={iconSize} alt={displayText} className={""}
                              ariaHidden={false}></ImgIcon>)
    }
      {displayText}
    </a></>
  ) : <></>;
};

export default CallToAction;

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
