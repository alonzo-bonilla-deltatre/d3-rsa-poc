import { DistributionEntity } from '@/models/types/forge';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { nanoid } from 'nanoid';
import { StoryPart } from '@/models/types/storyPart';
import Picture from '@/components/common/Picture';

type PhotoPartProps = {
  image: DistributionEntity;
};

const PhotoPart = ({ ...props }: PhotoPartProps) => {
  const img = props.image;

  return img.slug && img.image ? (
    <>
      <figure>
        <Picture
          src={img.image.templateUrl}
          alt={img.image.title ?? ''}
          transformations={transformations.thumbnailDetail}
          className="w-full h-full object-cover"
        ></Picture>
      </figure>
    </>
  ) : (
    <></>
  );
};

export default PhotoPart;

export const renderPhotoStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? (
    <PhotoPart
      key={nanoid()}
      image={data}
    />
  ) : (
    <></>
  );
