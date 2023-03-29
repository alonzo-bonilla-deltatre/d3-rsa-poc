import { DistributionEntity } from "@/models/types/dapi";
import Picture from "../../Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";
import { nanoid } from "nanoid";
import { StoryPart } from "@/models/types/storyPart";

type PhotoPartProps = {
  image: DistributionEntity;
};

const PhotoPart = ({ ...props }: PhotoPartProps) => {
  const img = props.image;
  return img.slug ? (
    <>
      <figure>
        <Picture src={img.image.templateUrl}
          width={800}
          height={450} alt={img.image.title ?? ""}
          transformations={transformations.heroSwiper}></Picture>
      </figure>
    </>
  ) : <></>;
};

export default PhotoPart;

export const renderPhotoStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
data ? <PhotoPart key={nanoid()} image={data} /> : <></>;