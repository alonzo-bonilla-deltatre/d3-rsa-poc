import SvgIcon from '@/components/common/SvgIcon/SvgIcon';
import { Tag } from '@/models/types/forge';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type RooflineProps = {
  context?: Tag | null;
  hide?: boolean;
  className?: string;
  icon?: React.ElementType | null;
};

const defaultClassName = 'uppercase text-xs barlow-bold my-1 w-fit';

const Roofline = ({ context, hide, className, icon }: RooflineProps) => {
  hide = getBooleanProperty(hide);
  if (context?.title && !hide) return null;
  return (
    <div className={className ?? defaultClassName}>
      {icon && (
        <SvgIcon
          className={'w-4 h-4 mr-2 text-white '}
          size={20}
          icon={icon}
        ></SvgIcon>
      )}
      <span>{context?.title}</span>
    </div>
  );
};

export default Roofline;
