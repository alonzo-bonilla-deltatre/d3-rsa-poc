import { translate } from "@/utilities/i18n";
import { getSrcWithTransformation, transformations } from "@/utilities/cloudinaryTransformations";
import Image from "next/image";

type SponsoredProps = {
  hide: boolean;
  name: string;
  width: number;
  height: number;
  className: string;
  assetUrl: string;
};

const Sponsored = ({ ...props }: SponsoredProps) => {
  const desktopSrc = getSrcWithTransformation(props.assetUrl,transformations.logos.desktop);


  return !props.hide && props.assetUrl ? (
    <>
    <div className="flex flex-row items-end col-start-10 row-start-10">
                  <span className="text-xs uppercase">
                    {translate("sponsored-by")}
                  </span>
                  <Image
                    className={props.className}
                    src={desktopSrc}
                    alt={props.name}
                    width={props.width}
                    height={props.height}
                  />
                </div>
    </>
  ) : <></>;
};

export default Sponsored;
