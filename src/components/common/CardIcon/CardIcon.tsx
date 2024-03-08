import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { renderSvgIcon } from '@/components/icons';

type CardIconProps = {
  entityCode?: string | '';
  hide?: boolean;
  className?: string;
};

const CardIcon = ({ entityCode, hide, className }: CardIconProps) => {
  hide = getBooleanProperty(hide);
  if (hide) {
    return null;
  }
  switch (entityCode) {
    case 'brightcovevideo':
    case 'divavideo':
      return (
        <div className={`card__icon ${className}`}>
          {renderSvgIcon('Play', { className: 'w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12', width: 50, height: 50 })}
        </div>
      );
    case 'event':
      return <div className="">{renderSvgIcon('Event', { className: 'w-5 h-5', width: 20, height: 20 })}</div>;
    default:
      return null;
  }
};

export default CardIcon;
