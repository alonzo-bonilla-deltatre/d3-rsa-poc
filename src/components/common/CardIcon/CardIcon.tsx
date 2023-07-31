import ImgIcon from '@/components/common/ImgIcon/ImgIcon';

type CardIconProps = {
  entityCode?: string | '';
  hide?: boolean;
};

const CardIcon = ({ ...props }: CardIconProps) => {
  //TODO icon by entity code
  const icon = '/icons/header_ticket.svg';
  const iconSize = 44;
  const itemText = props.entityCode ?? '';
  return !props.hide ? (
    <ImgIcon
      src={icon}
      width={iconSize}
      height={iconSize}
      alt={itemText}
    ></ImgIcon>
  ) : (
    <></>
  );
};

export default CardIcon;
