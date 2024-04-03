import SvgIcon from '@/components/commons/SvgIcon/SvgIcon';
import Lock from '@/components/icons/Lock/Lock';
import Unlock from '@/components/icons/Unlock/Unlock';

type VideoChipProps = {
  rights?: string | '';
};

const VideoChip = ({ rights }: VideoChipProps) => {
  switch (rights?.toLowerCase()) {
    case 'premium':
      return (
        <div className="card__chip--premium d3-ty-tag-small">
          <span>premium</span>
          <SvgIcon
            className={'w-2.5 h-3'}
            size={10}
            icon={Lock}
          ></SvgIcon>
        </div>
      );
    case 'freemium':
      return (
        <div className="card__chip--freemium d3-ty-tag-small">
          <span>freemium</span>
          <SvgIcon
            className={'w-2.5 h-3'}
            size={10}
            icon={Unlock}
          ></SvgIcon>
        </div>
      );
    default:
      return null;
  }
};

export default VideoChip;
