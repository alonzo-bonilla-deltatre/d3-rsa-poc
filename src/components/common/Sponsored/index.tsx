import { translate } from "@/utilities/i18n";
import Picture from "../Picture";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { getAssetsByTag } from "@/services/gadService";
import { transformations } from "@/utilities/cloudinaryTransformations";

type SponsoredProps = {
  hide: boolean;
  tag: string;
  name: string;
  width: number;
  height: number;
  className: string;
};

const Sponsored = async ({ ...props }: SponsoredProps) => {
  if (!Object.hasOwn(props, "tag") || !props.tag) {
    logger.log(
      "Cannot render Sponsor with empty tag",
      LoggerLevel.warning
    );
    return null;
  }
  const gadAssetsFetch = getAssetsByTag(props.tag);
  const [gadAssets] = await Promise.all([gadAssetsFetch]);
  const logo: GraphicAssetsDashboardItem | null = gadAssets?.length
    ? gadAssets[0]
    : null;

  return !props.hide && logo ? (
    <>
    <div className="flex flex-row items-end col-start-10 row-start-10">
                  <span className="text-xs uppercase">
                    {translate("sponsored-by")}
                  </span>
                  <Picture
                    className={props.className}
                    src={logo.assetUrl}
                    alt={props.name}
                    width={props.width}
                    height={props.height}
                    transformations={transformations.logos}
                  />
                </div>
    </>
  ) : <></>;
};

export default Sponsored;
