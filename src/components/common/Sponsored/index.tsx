import { translate } from "@/utilities/i18n";
import Picture from "@/components/common/Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";

type SponsoredProps = {
  hide: boolean;
  name: string;
  width: number;
  height: number;
  className: string;
  assetUrl: string;
};

const Sponsored = ({ ...props }: SponsoredProps) => {

  return !props.hide && props.assetUrl ? (
    <>
    <div className="flex flex-row items-end col-start-10 row-start-10">
                  <span className="text-xs uppercase">
                    {translate("sponsored-by")}
                  </span>
                  <Picture
                    className={props.className}
                    src={props.assetUrl}
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
