import GadAsset from '@/components/common/GadAsset';
import SvgIcon from '@/components/common/SvgIcon';
import { Tag } from '@/models/types/forge';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { nanoid } from 'nanoid';

type RooflineProps = {
  context?: Tag | null;
  hide?: boolean;
  className?: string;
  icon?: React.ElementType | null;
  asset?: GraphicAssetsDashboardItem | null;
};

const defaultClassName = 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-1 w-fit';

const Roofline = ({ ...props }: RooflineProps) => {
  const asset = props.asset;
  return props?.context?.title && (props.hide === undefined || props.hide?.toString() === 'false') ? (
    <div
      key={nanoid()}
      className={props.className ?? defaultClassName}
    >
      {props.icon && (
        <SvgIcon
          className={'w-4 h-4 mr-2 text-white '}
          size={20}
          icon={props.icon}
        ></SvgIcon>
      )}
      {asset && (
        <GadAsset
          src={asset?.assetUrl}
          width={20}
          height={20}
          title={asset?.name}
          transformations={transformations.logos}
        ></GadAsset>
      )}
      <span>{props.context.title}</span>
    </div>
  ) : (
    <></>
  );
};

export default Roofline;
