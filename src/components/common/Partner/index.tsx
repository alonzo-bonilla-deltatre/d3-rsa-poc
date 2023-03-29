import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import { getSingleAssetByTag } from "@/services/gadService";
import { transformations } from "@/utilities/cloudinaryTransformations";
import Picture from "../Picture";
import { DistributionEntity } from "@/models/types/dapi";
import { PartnerFields } from "@/models/types/dapi.customEntityFields";


type ParnerProps = {
  entity: DistributionEntity;
  width: number;
  height: number;
};


const Partner = async ({ ...props }: ParnerProps) => {
  const entity = props.entity;
  const partnerTag = entity && (entity.fields as PartnerFields).PartnerLogo;
  const partnerName = entity && (entity.fields as PartnerFields).PartnerName;
  const partnerLink = entity && (entity.fields as PartnerFields).PartnerLink;

  if (!partnerTag) {
    logger.log(
      "Cannot render Partner with empty tag",
      LoggerLevel.warning
    );
    return null;
  }
  const logo = await getSingleAssetByTag(partnerTag);

  return logo ? (
    <div className="">
                  
                  <Picture
                    className=""
                    src={logo.assetUrl}
                    alt={partnerName}
                    width={props.width}
                    height={props.height}
                    transformations={transformations.logos}
                  />
                  <span className="text-xs uppercase">
                    {partnerName}
                  </span>
                </div>
  ) : <></>;
};

export default Partner;
