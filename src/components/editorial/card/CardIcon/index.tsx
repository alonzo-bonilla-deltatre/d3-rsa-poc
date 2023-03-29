import SvgIcon from "../../../common/SvgIcon";

type CardIconProps = {
  entityCode: string;
  hide: boolean;
};


const CardIcon = ({ ...props }: CardIconProps) => {
  //TODO icon by entity code
const icon = "/icons/header_ticket.svg";
const iconSize = 44;
const itemText = props.entityCode;
  return !props.hide ? (
      <SvgIcon src={icon} width={iconSize} height={iconSize} alt={itemText}></SvgIcon>
  ) : <></>;
};

export default CardIcon;
