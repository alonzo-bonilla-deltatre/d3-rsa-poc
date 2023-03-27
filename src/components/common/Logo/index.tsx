import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { firstAssetOrDefault, getAssetsByTag } from "@/services/gadService";
import { transformations } from "@/utilities/cloudinaryTransformations";
import Picture from "../Picture";

type LogoProps = {
  width: number;
  height: number;
  alt: string;
  className: string;
  tagName: string;
  link: string;
};


const Logo = async ({ ...props }: LogoProps) => {

  const gadAssetsFetch = getAssetsByTag(props.tagName);

  const [gadAssets] = await Promise.all([gadAssetsFetch]);
  const logo: GraphicAssetsDashboardItem | null = firstAssetOrDefault(gadAssets);


  return logo && (
    <div className="flex items-center" role="presentation">
      <Picture
        className="max-sm:w-full"
        src={logo.assetUrl}
        alt={props.alt}
        width={props.width}
        height={props.height}
        transformations={transformations.logos}
      />
    </div>
  );
};

export default Logo;
