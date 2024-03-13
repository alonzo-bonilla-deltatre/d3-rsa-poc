'use client'; // diva-web-sdk uses createContext
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import {
  DivaApiType,
  DivaInputProp,
  DivaPlayerProps,
  DivaPlayerWrappedComponent,
} from '@deltatre-vxp/diva-web-divaboadapter';
import { DivaAPI, VideoError, VideoMetadataClean } from '@deltatre-vxp/diva-web-sdk';
import '@deltatre-vxp/diva-web-sdk/index.min.css';
import { getSettingUrl, getVideoType } from '@/helpers/divaHelper';
import { DistributionEntity } from '@/models/types/forge';
import { useEnvVars } from '@/hooks/useEnvVars';
import { getBooleanPropertyDefault, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';

type DivaVideoPlayerProps = {
  videoEntity: DistributionEntity;
};

const DivaVideoPlayer = ({ videoEntity }: DivaVideoPlayerProps) => {
  const envVars = useEnvVars();
  let divaAPI: DivaApiType;
  const videoId = videoEntity?.fields?.videoId;
  const videoType = getVideoType(videoEntity);
  const videoSettingsUrl = envVars.VIDEO_SETTINGS_BASE_URL || '';
  const settingUrl = getSettingUrl(videoType, videoSettingsUrl);
  const setAPI = (ref: DivaAPI): void => {
    divaAPI = ref;
  };

  const setAccessTokenForEntitlementProvider = () => {
    return '';
  };

  const onVideoError = (videoError: VideoError, videoMetadata: VideoMetadataClean | undefined) => {
    logger.log(`Divaplayer error: ${JSON.stringify([videoMetadata, videoError])}`, LoggerLevel.error);
  };

  const divaPlayerProps: DivaPlayerProps = {
    settingurl: settingUrl,
    languageCode: envVars.CULTURE || 'en-GB',
    videoPlayerId: videoId,
    setUserEntitlement: setAccessTokenForEntitlementProvider,
    setDivaApi: setAPI,
    otherParams: {
      platform: 'web_browser',
    },
  };

  const divaInputProps: DivaInputProp = {
    divaPlayerProps,
    divaLaunchParams: {
      deepLinkType: 'relative',
    },
    mediaAnayticsProp: undefined,
    divaOptionalProps: {
      onVideoError: (videoError: VideoError, videoMetadata: VideoMetadataClean | undefined) =>
        onVideoError(videoError, videoMetadata),
      bitratePreferences: {
        min: getNumberProperty(envVars.DIVA_OPT_PROPS_BITRATE_MIN, -1),
        max: getNumberProperty(envVars.DIVA_OPT_PROPS_BITRATE_MAX, -1),
        starting: getNumberProperty(envVars.DIVA_OPT_PROPS_BITRATE_STARTING, -1),
        useLast: getBooleanPropertyDefault(envVars.DIVA_OPT_PROPS_BITRATE_USE_LAST, false),
      },
    },
  };

  return (
    <div className="block relative w-full">
      {divaInputProps && <DivaPlayerWrappedComponent {...divaInputProps} />}
      {!divaInputProps && <div>no config</div>}
    </div>
  );
};

export default DivaVideoPlayer;
