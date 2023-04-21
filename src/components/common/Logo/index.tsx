import { transformations } from "@/utilities/cloudinaryTransformations";
import Picture from "@/components/common/Picture";


type LogoProps = {
  width: number;
  height: number;
  alt: string;
  className: string;
  link: string;
  assetUrl: string;
};


const Logo = ({ ...props }: LogoProps) => {
  const height = props.height ? props.height : (props.width ? props.width : 50);
  
  return props.assetUrl ? (
    <div className="flex items-center" role="presentation">
      <Picture src={props.assetUrl} width={props.width} height={height} className="max-sm:w-full" alt={props.alt} transformations={transformations.logos}></Picture>
    </div>
  ): <></>;
};

export default Logo;
