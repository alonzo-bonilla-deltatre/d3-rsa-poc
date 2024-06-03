'use client'; // diva-web-sdk uses createContext

import { getSettingUrl, getVideoType } from '@/helpers/divaHelper';
import { DistributionEntity } from '@/models/types/forge';
import { useEnvVars } from '@/hooks/useEnvVars';
import { DivaWebBoAdapter } from '@deltatre-vxp/diva-sdk/diva-web-bo-adapter'; // bo adapter sdk
import '@deltatre-vxp/diva-sdk/diva-web-sdk/index.min.css';
import { BoAdapterWebComponentProps } from '@deltatre-vxp/diva-sdk/diva-web-bo-adapter/types/types'; // Import SDK style

type DivaVideoPlayerProps = {
  entity: DistributionEntity;
};

const DivaVideoPlayer = ({ entity }: DivaVideoPlayerProps) => {
  const envVars = useEnvVars();
  const videoId = entity?.fields?.videoId;
  const videoType = getVideoType(entity);
  const videoSettingsUrl = envVars.DIVA_PLAYER_VIDEO_SETTINGS_BASE_URL || '';
  const settingUrl = getSettingUrl(videoType, videoSettingsUrl);

  if (!videoId || !videoSettingsUrl) return null;

  const props: BoAdapterWebComponentProps = {
    settingsUrl: settingUrl,
    languageCode: envVars.CULTURE,
    languageDictionary: envVars.CULTURE,
    onDivaBoAdapterError: console.error,
    config: {
      videoId: videoId,
      libs: {
        mux: 'https://cdnjs.cloudflare.com/ajax/libs/mux.js/6.2.0/mux.min.js',
        shaka: 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.3.7/shaka-player.compiled.js',
        hlsJs: 'https://cdn.jsdelivr.net/npm/hls.js@1.4.12',
        googleIMA: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
        googleDAI: 'https://imasdk.googleapis.com/js/sdkloader/ima3_dai.js',
        googleCast: 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1',
        threeJs: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.148.0/three.min.js',
      },
      autoplay: false,
    },
  };

  return (
    <div className="block relative w-full">
      <DivaWebBoAdapter {...props} />
    </div>
  );
};

export default DivaVideoPlayer;
