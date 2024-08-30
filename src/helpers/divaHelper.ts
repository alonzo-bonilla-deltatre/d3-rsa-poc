import { VideoType } from '@/models/types/diva';

/**
 * Determines the type of video based on its content fields.
 *
 * @param {any} videoContent - The content fields of the video.
 * @returns {VideoType} The type of the video.
 */
export const getVideoType = (videoContent: any): VideoType => {
  const { videoStatus, WORKFLOW, v_has_data, v_provider } = videoContent.fields;
  const scoreV_provider = v_provider === 'linear' ? 1 : 0;
  const scoreV_has_data = v_has_data === true ? 2 : 0;
  const scoreWORKFLOW = WORKFLOW === 'LIVE' ? 4 : 0;
  const scoreVideoStatus = videoStatus === 'Live' ? 8 : 0;
  const videoScore = scoreV_provider + scoreV_has_data + scoreWORKFLOW + scoreVideoStatus;

  switch (videoScore) {
    case 12:
      return VideoType.livenodata;

    case 4:
      return VideoType.replaynodata;

    case 0:
      return VideoType.vod;

    case 14:
      return VideoType.livewithdata;

    case 6:
      return VideoType.replaywithdata;

    case 13:
      return VideoType.linear;

    /* istanbul ignore next */
    default:
      return VideoType.vod;
  }
};

/**
 * Constructs the URL for the video settings based on the video type.
 *
 * @param {VideoType} videoType - The type of the video.
 * @param {string} videoSettingsUrl - The base URL for the video settings.
 * @returns {string} The URL for the video settings.
 */
export const getSettingUrl = (videoType: VideoType, videoSettingsUrl: string): string => {
  return `${videoSettingsUrl}/${videoType}/html5`;
};
