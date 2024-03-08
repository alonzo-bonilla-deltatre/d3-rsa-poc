'use client';
import Picture from '@/components/common/Picture/Picture';
import WithOverlayContent from '@/components/HOC/WithOverlayContent';
import WithVideoModal, { WithVideoModalProps } from '@/components/HOC/WithVideoModal';
import Play from '@/components/icons/Play/Play';
import { DivaVideoFields } from '@/models/types/forge.customEntityFields';
import { transformations } from '@/utilities/cloudinaryTransformations';
import useTranslate from '@/hooks/useTranslate';
import { StoryPart } from '@/models/types/storyPart';
import SvgIcon from '@/components/common/SvgIcon/SvgIcon';

type VideoPartProps = {
  video: StoryPart;
} & WithVideoModalProps;

const DivaVideo = WithVideoModal(({ video, openVideoModal }: VideoPartProps) => {
  if (!video) return null;
  const fields = video.fields as DivaVideoFields;
  if (!fields) return null;
  const translate = useTranslate();

  return (
    <WithOverlayContent
      content={
        <SvgIcon
          className={'w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 text-white'}
          size={50}
          icon={Play}
        ></SvgIcon>
      }
      classNames="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="rounded-md mb-2 lg:mb-4 overflow-hidden cursor-pointer"
        onClick={() => openVideoModal(video)}
        role="button"
        aria-label={translate('play')}
      >
        <figure>
          <Picture
            src={video.thumbnail?.templateUrl ?? ''}
            alt={video.title ?? ''}
            transformations={transformations.thumbnail_wide_detail}
            className="w-full h-full object-cover"
          ></Picture>
        </figure>
      </div>

      <div className="px-2 border-l-4 rtl:border-r-4 rtl:border-l-0 border-grey-light">
        <p className="font-subtitle2 mb-2">{fields.videoDisplayText}</p>
        <p className="font-caption text-grey-medium">{fields.description}</p>
      </div>
    </WithOverlayContent>
  );
});

export default DivaVideo;
