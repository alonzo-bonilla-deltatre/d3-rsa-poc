import ImgIcon from '@/components/common/ImgIcon';

type CallToActionProps = {
  url?: string;
  text?: string | null;
  isExternal?: boolean;
  style?: string;
  icon?: string;
  hide?: boolean;
};

const CallToAction = ({ ...props }: CallToActionProps) => {
  const displayText = props.text ? props.text : 'read-more';
  const displayStyle = props.style ?? '';
  const iconSize = 20;
  const additionalAttributes = {
    ...(props.isExternal ? { target: 'blank' } : undefined),
  };
  return props.url && !props.hide ? (
    <>
      <a
        href={props.url}
        title={displayText}
        className={getCtaClasses(displayStyle)}
        {...additionalAttributes}
      >
        {props.icon && (
          <ImgIcon
            src={props.icon}
            width={iconSize}
            height={iconSize}
            alt={displayText}
          ></ImgIcon>
        )}
        {displayText}
      </a>
    </>
  ) : (
    <></>
  );
};

export default CallToAction;

export const getCtaClasses = (style: string) => {
  switch (style) {
    case 'default':
      return 'inline-block text-white bg-[#EE3123] font-bold uppercase px-8 py-3 rounded-full outline-none';
    case 'reverse':
      return 'inline-block text-black bg-white font-bold uppercase px-8 py-3 rounded-full outline-none';
    case 'outline':
      return 'inline-block text-white bg-[#EE3123] font-bold uppercase px-8 py-3 rounded-full outline-none';
    case 'link':
      return 'inline-block text-white bg-[#EE3123] font-bold uppercase px-8 py-3 rounded-full outline-none';
    default:
      return 'inline-block text-black border-2  bg-[#EE3123] font-bold uppercase px-8 py-3 rounded-full outline-none';
  }
};
