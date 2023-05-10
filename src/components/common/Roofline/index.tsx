import { Tag } from '@/models/types/dapi';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { nanoid } from 'nanoid';
import GadAsset from '@/components/common/GadAsset';
import SvgIcon from '@/components/common/SvgIcon';
import { transformations } from '@/utilities/cloudinaryTransformations';

type RooflineProps = {
  context: Tag;
  hide: boolean;
  className?: string;
  icon?: React.ElementType | null | undefined;
  asset?: GraphicAssetsDashboardItem | null | undefined;
};

const defaultClassName = 'uppercase mr-2 font-bold text-base bg-[#EE3123] p-1 w-fit';

const Roofline = ({ ...props }: RooflineProps) => {
  const asset = props.asset;
  return props.context && props.context?.title ? (
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
