import { ComponentProps } from '@/models/types/components';
import { getSingleAssetByTag } from '@/services/gadService';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import GadAsset from '@/components/common/GadAsset';
import { ImageTransformations } from '@/models/types/images';
import { transformations } from '@/utilities/cloudinaryTransformations';

type ModuleProps = {
  assetTag: string;
  assetName: string;
  assetLink: string;
  assetWidth: number;
  assetHeight: number;
  transformation: string;
  className?: string;
};

const GraphicAsset = async ({ ...data }: ComponentProps) => {
  const { assetTag, assetName, assetLink, assetWidth, assetHeight, transformation, className } =
    data.properties as ModuleProps;
  const namedTransformation = transformation ?? 'logos';
  const width = assetWidth ?? 50;
  const height = assetHeight ?? 50;
  const asset = (await getSingleAssetByTag(assetTag)) as GraphicAssetsDashboardItem;
  const imageTransformation = transformations[namedTransformation] as ImageTransformations;
  const link = assetLink ?? '#nolink';

  return asset?.assetUrl ? (
    <>
      <a
        href={link}
        className={className}
      >
        <GadAsset
          src={asset.assetUrl}
          className="max-sm:w-full"
          title={assetName}
          transformations={imageTransformation}
          width={width}
          height={height}
        ></GadAsset>
      </a>
    </>
  ) : (
    <></>
  );
};
export default GraphicAsset;
