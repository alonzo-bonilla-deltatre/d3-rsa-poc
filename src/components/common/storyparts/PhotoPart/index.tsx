import { DistributionEntity } from "@/models/types/dapi";
import Picture from "../../Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";


type PhotoPartProps = {
  image: DistributionEntity;
};


const PhotoPart = ({ ...props }: PhotoPartProps) => {
  const img = props.image;
  return img.slug ? (
    <>
      <figure className="text-white mt-20 mx-60 col-start-1">
        <Picture src={img.image.templateUrl}
          width={800}
          height={450} alt={img.image.title ?? ""}
          transformations={transformations.heroSwiper}></Picture>
      </figure>
    </>
  ) : <></>;
};


export default PhotoPart;
