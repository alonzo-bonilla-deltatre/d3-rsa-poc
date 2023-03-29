import PhotoPart from "@/components/common/StoryPart/PhotoPart";
import { StoryPart } from "@/models/types/storyPart";
import { nanoid } from "nanoid";

export const renderPhotoStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
data ? <PhotoPart key={nanoid()} image={data} /> : <></>;