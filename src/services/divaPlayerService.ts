/* istanbul ignore file */
import logger from '@/utilities/loggerUtility';
import { LoggerLevel } from '@/models/types/logger';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import crypto from 'crypto';

const DEFAULT_HEARTBEAT = 60 * 60; // in seconds
const DEFAULT_AKAMAI_EXPIRATION_WINDOW = 60; // in seconds

export const getDivaPlayerSetting = () => {
  // settings.general
  const audioSelectionMethod = process.env.DIVA_PLAYER_CUSTOM_AUDIO_SELECTION ?? 'title';
  const closedCaptionSelectionMethod = process.env.DIVA_PLAYER_CUSTOM_CC_SELECTION ?? 'lang';
  // settings.translation
  const dictionaryUrl = process.env.DIVA_PLAYER_CUSTOM_DICTIONARY_URL ?? '/api/diva/dictionary';
  // settings.videoData
  const videoDataDomain = process.env.DIVA_PLAYER_VIDEODATA_DOMAIN ?? '';
  // settings.entitlement
  const entitlementUrl = process.env.DIVA_PLAYER_CUSTOM_ENTITLEMENT_URL ?? '/api/diva/entitlement';
  const heartbeatUrl = process.env.DIVA_PLAYER_CUSTOM_HEARTBEAT_URL ?? '/api/diva/heartbeat';
  const heartbeatPollingInterval =
    (Number(process.env.DIVA_PLAYER_HEARTBEAT_INTERVAL_IN_SECONDS) || DEFAULT_HEARTBEAT) * 1000;
  const fairPlayCertificateUrl = process.env.DIVA_PLAYER_FAIRPLAY_CERTIFICATE_URL ?? '';

  if (!videoDataDomain) {
    logger.log(`Missing env var 'videoDataDomain'`, LoggerLevel.error);
  }

  return {
    settings: {
      general: {
        culture: 'en-US',
        audioSelectionMethod: audioSelectionMethod,
        closedCaptionSelectionMethod: closedCaptionSelectionMethod,
        backgroundImage: '',
        isCommentaryBadgeVisible: false,
        isCommentaryFilteredByChapter: false,
        isMiddleTimelineEventsLineEnabled: false,
        isMultiViewModeSwitchEnabled: false,
        isTimelineEventsVisibleWithCommentaryOpen: false,
        isVideoThumbnailPreviewEnabled: false,
        isEndOfPlayEnabled: false,
        jumpLargeGaps: false,
        liveBackOff: 1000,
        pipMode: false,
        relevantCommentaryStartsVisible: false,
        resolveManifestUrl: false,
        smallGapLimit: 5,
        trackVideoDataManifest: false,
        videoAnalyticsEventFrequency: 30000,
      },
    },
    translations: {
      vocabularySource: dictionaryUrl,
    },
    videoData: {
      videoDataPath: videoDataDomain?.replace(/\/+$/, '') + '/video/videodata/v2/{v.id}',
      videoDataPollingInterval: 20000,
      videoPlatformsPriority: {
        default: [
          {
            type: 'DASH',
            sourceName: 'DASH',
            drmType: 'widevine',
          },
          {
            type: 'DASH',
            sourceName: 'Desktop-DASH',
            drmType: 'widevine',
          },
          {
            type: 'HLS',
            sourceName: 'HLS',
            drmType: 'fairplay',
          },
          {
            type: 'HLS',
            sourceName: 'Desktop-HLS',
            drmType: 'fairplay',
          },
        ],
        chromecast: [
          {
            type: 'DASH',
            sourceName: 'Chromecast-DASH',
            drmType: 'widevine',
          },
        ],
      },
    },
    entitlementCheck: {
      entitlementUrl: entitlementUrl,
      heartbeatUrl: heartbeatUrl,
      heartbeatPollingInterval: heartbeatPollingInterval,
      other: '{Run.SessionID}',
      fairPlayCertificateUrl: fairPlayCertificateUrl,
    },
    mediaAnalytics: {},
  };
};

export const getDivaPlayerDictionary = () => {
  return {
    messages: {
      aac_und_2_129_2_1: 'Primary',
      arabic: 'Arabic',
      default_audio_selected: 'Default Audio',
      Disabled: 'Disabled',
      diva_360clips: '360 CLIPS',
      diva_360multicam: '360 MULTICAM',
      diva_accessibility_high_contrast_description:
        'Turn on increase contrast mode if you are having trouble seeing the menu',
      diva_accessibility_high_contrast_label: 'Increase contrast',
      diva_accessibility_high_contrast_title: 'Increase contrast',
      diva_ad_loading_text: 'Ad loading',
      diva_adblock: 'You need to disable AdBlock to view the content',
      diva_adClickToEnableAudio: 'Enable ad audio',
      diva_adResumeAt: 'Your video will resume after the following advertisements {cVideo}/{totVideo}',
      diva_adResumeTime: 'Your video will resume in {remTime} s',
      diva_airplay_error: 'Error trying to cast to AirPlay',
      diva_airplay_forbiden_error: 'AirPlay cast disabled in Diva settings',
      diva_alert: 'Alerts',
      diva_alert_back: 'Back to',
      diva_alert_replay: 'Replay',
      diva_alternate_timeline: 'Alternate Timeline',
      diva_alternate_timeline_show_all: 'See all events',
      diva_at_button_tooltip: 'AT',
      diva_at_settings_title: 'AT on/off',
      diva_audio: 'Audio',
      diva_audio_is_muted: 'Audio is muted',
      diva_back_button: 'Back',
      diva_button_close: 'Close',
      'diva_cc_#1 Fre': 'French',
      'diva_cc_#2 Eng': 'English',
      diva_cc_ar: 'Arabic',
      diva_cc_button_tooltip: 'CC/SUB',
      diva_cc_caption_style_header: 'Caption style',
      diva_cc_caption_style_title: 'Caption style',
      diva_cc_d3608: 'Enable CC',
      diva_cc_disabled: 'Disabled',
      diva_cc_en: 'English',
      diva_cc_enabled: 'Enabled',
      diva_cc_eng: 'english (lang)',
      diva_cc_english: 'English',
      diva_cc_enhancements_button: 'Caption style',
      diva_cc_enhancements_button_subtitle: 'Change text size and style',
      diva_cc_enlarge_description: 'Activate for a significant increase of the subtitles text, for better readability',
      diva_cc_enlarge_label: 'Enlarge text',
      diva_cc_enlarge_subheader: 'Enlarge text',
      diva_cc_enlarge_subtitle: 'Enlarge text',
      diva_cc_es: 'Spanish',
      diva_cc_fr: 'French',
      diva_cc_french: 'FRENCH',
      diva_cc_instant_replay: 'Instant replay',
      diva_cc_language_button: 'Caption Language',
      diva_cc_language_button_subtitle: 'Caption Language',
      diva_cc_language_menu_title: 'Caption Language',
      diva_cc_language_noname: 'Track',
      diva_cc_on_mute: 'On mute',
      diva_cc_panel_title: 'Subtitles',
      diva_cc_settings_header: 'Subtitles',
      diva_cc_settings_subheader: 'Style',
      diva_cc_settings_title: 'Subtitles',
      diva_cc_spanish: 'Spanish',
      diva_cc_style_description:
        'Activate to enable a darker background behind the subtitles text for increased visibility',
      diva_cc_style_label: 'Style',
      diva_cc_style_subtitle: 'Style',
      diva_ccat_panel_title: 'Audio/Subs',
      diva_chapters_close: 'Close Chapters',
      diva_chapters_open: 'Chapters',
      diva_chromecast: 'Chromecast',
      diva_close_stats_button: 'Close',
      diva_close_this_video: 'Close video',
      diva_closed_caption: 'Closed Caption',
      diva_collapse_this_video: 'Collapse video',
      diva_data_panel_button_tooltip: 'Stats',
      diva_data_panel_close_button: 'Close Data Panel',
      diva_data_panel_error_description: 'The data are currently not available. Please check later',
      diva_data_panel_error_header: 'No data available',
      diva_data_panel_error_title: 'Statistics',
      diva_data_panel_no_data_available_description: 'Please check back here shortly after the game has started!',
      diva_data_panel_no_data_available_title: 'No data available yet',
      diva_data_panel_notification: 'New statistics',
      diva_drm_error: 'Content protection error',
      diva_ecommerce_rotate_device: 'Rotate your screen to view the shop',
      diva_enterpip: 'Enter pip mode',
      diva_eop_reccomandation_title: 'Recommendations',
      diva_eop_recommendation_title: 'Recommendations',
      diva_eop_replay: 'Replay',
      diva_eop_rewind: 'Rewind',
      diva_eop_starts_in_seconds: 'Starts in {seconds} sec',
      diva_error_button_ok: 'OK',
      diva_error_title: 'Error',
      diva_exit_theater_mode: 'Exit Theater Mode',
      diva_exitfullscreen: 'Exit Full Screen',
      diva_exitpip: 'Exit pip mode',
      diva_fullmatch_highlights_button_label: 'Full Match',
      diva_fullscreen: 'Full Screen',
      diva_gck_cancel: 'Cancel',
      diva_gck_connect_to_device: 'Cast to',
      diva_gck_stop_casting: 'Stop casting',
      diva_go_live: 'Go Live',
      diva_highlights_alert_seek_unavailable: 'Return to the full match to use rewind and fast forward',
      diva_highlights_badge_live: 'Live highlights',
      diva_highlights_badge_long: 'Highlights long',
      diva_highlights_badge_medium: 'Highlights medium',
      diva_highlights_badge_short: 'Highlights short',
      diva_highlights_notification: 'Match Highlights',
      diva_highlights_title_live: 'Live highlights',
      diva_highlights_title_long: 'Highlights long',
      diva_highlights_title_medium: 'Highlights medium',
      diva_highlights_title_short: 'Highlights short',
      diva_highlightsmode_full: 'Full Match',
      diva_highlightsmode_highlights: 'Highlights',
      diva_highlightsmode_highlights_title: 'Highlights duration:',
      diva_highlightsmode_howto: 'How do you want to watch this match?',
      diva_highlightsmode_live: 'Live',
      diva_highlightsmode_loading: 'Highlights cards processing...',
      diva_highlightsmode_long: 'Long',
      diva_highlightsmode_medium: 'Medium',
      diva_highlightsmode_next: 'Next',
      diva_highlightsmode_notification_subtitle: 'Would you like to watch them?',
      diva_highlightsmode_notification_title: "Don't miss {n} key moments",
      diva_highlightsmode_notification_watch: 'Watch',
      diva_highlightsmode_resume: 'Resume Highlights',
      diva_highlightsmode_short: 'Short',
      diva_highlightsmode_youarein: 'You are in highlights mode',
      diva_hours: 'h',
      diva_live: 'LIVE NOW',
      diva_menu_button: 'MENU',
      diva_menu_close_button: 'Close Menu',
      diva_menu_full_stats_button: 'All Stats',
      diva_minutes: 'm',
      diva_multicam: 'MULTICAM',
      diva_mute: 'Mute',
      diva_next_highlights_button_label: 'Next',
      diva_no_highlights_error: 'No key moments available at the moment. Please try later',
      diva_no_multicam: 'Videos will appear as soon as they are published, please retry in a short while',
      diva_noplaybyplay: 'First message will be displayed shortly after the start of the session',
      diva_novideoavailable: '',
      diva_overlay_load_failure: 'Could not load overlay',
      diva_pausebutton: 'Pause',
      diva_pinned: 'Pinned',
      diva_playbutton: 'Play',
      diva_playbyplay: 'Commentary',
      diva_recommendation_next_videos: 'Next videos',
      diva_recommendation_video_autoload: 'Next video will start in {sec} sec',
      diva_recommendation_watch_again: 'Watch again',
      diva_recommendation_watch_next_video: 'Watch the next video',
      diva_seconds: 's',
      diva_seekback_button: '-{n}',
      diva_seekforward_button: '+{n}',
      diva_select_chapter: 'Chapter List',
      diva_settings: 'Settings Panel',
      diva_settings_button: 'Settings',
      diva_settings_close: 'Close',
      diva_settings_hdr_description: 'Disable HDR if you are experiencing problems seeing the colours in the video',
      diva_settings_hdr_enable: 'Quality',
      diva_settings_hdr_label: 'HDR',
      diva_settings_hdr_OFF_value: 'Off',
      diva_settings_hdr_ON_value: 'On',
      diva_settings_pip_enable: 'Enable Picture-In-Picture',
      diva_settings_title: 'Settings',
      diva_show_multiview: 'Show in sideBySide',
      diva_spoil: 'SHOW EVENTS',
      diva_ssai_request_error:
        'This video is not working right now. Please disable any AdBlocker and then try again. In case this error persist please contact the Customer Care at help@diva.com',
      diva_swap_video: 'Swap video',
      diva_theater_mode: 'Theater Mode',
      diva_timeline_events_title: 'Key moments',
      diva_unmute: 'Unmute',
      diva_video_error: 'This video is not working or not available in your region.',
      diva_videolist_default_title: 'Default Title',
      diva_videolist_highlight: 'HIGHLIGHTS',
      diva_videolist_highlights: 'Highlights',
      diva_videolist_live: 'LIVE',
      diva_videolist_title_highlight: 'Highlights',
      diva_videolist_title_highlights: 'Highlights',
      diva_videolist_watching: 'WATCHING',
      diva_videometadata_error: 'The video metadata are corrupted. Please try another video',
      diva_vr_start_video_loading: 'VR loading ...',
      dolby: 'Dolby',
      english: 'English',
      entitlementCode_10: 'Sorry! We are unable to detect your account. Please login again.',
      entitlementCode_11: 'Sorry! This content is not available with your credentials.',
      entitlementCode_12: 'Session preview is over.',
      entitlementCode_13: 'Please check if you have another browser or app running the same session.',
      entitlementCode_14: 'Sorry! We have detected a DRM error.',
      entitlementCode_21: 'Sorry! We have detected a system error. Please retry later.',
      entitlementCode_22: 'Sorry! We have detected an error in your broadband network. Please check your connection.',
      french: 'French',
      italian: 'Italian',
      primary: 'Primary',
      secondary: 'Secondary',
      shop: 'Shop',
      spanish: 'Spanish',
      ARA: 'Primary',
      ENG: 'Secondary',
    },
  };
};

export const getDivaPlayerEntitlement = (request: any) => {
  const heartbeatPollingInterval = process.env.DIVA_PLAYER_HEARTBEAT_INTERVAL_IN_SECONDS ?? DEFAULT_HEARTBEAT;
  const akamaiExpirationWindow = Number(
    process.env.DIVA_PLAYER_AKAMAI_EXPIRATION_WINDOW ?? DEFAULT_AKAMAI_EXPIRATION_WINDOW
  );
  const akamaiKey = process.env.DIVA_PLAYER_AKAMAI_KEY ?? '';
  const contentKeyData = request.ContentKeyData;
  const sessionId = parseSessionId(request.Other);
  const userId = request.User;
  const authType = request.AuthType;

  const token =
    !!authType && authType.toLowerCase() === 'token' ? generateCastlabAuthToken(contentKeyData, sessionId, userId) : '';

  let contentUrl = request.VideoSource;

  if (!!process.env.DIVA_PLAYER_AKAMAI_KEY) {
    try {
      contentUrl = generateTokenizedURL(request.VideoSource, akamaiKey, akamaiExpirationWindow);
      return {
        Response: 'OK',
        ContentUrl: contentUrl,
        AuthToken: token,
        HeartBeatTime: heartbeatPollingInterval,
        LicenseURL: null,
      };
    } catch (error) {
      logger.log(JSON.stringify(error), LoggerLevel.error);
      return {};
    }
  } else {
    return {
      Response: 'OK',
      ContentUrl: contentUrl,
      AuthToken: token,
      HeartBeatTime: heartbeatPollingInterval,
      LicenseURL: null,
    };
  }
};

const parseSessionId = (otherParams: any) => {
  let index = otherParams?.indexOf('|') || -1;

  return index !== -1 ? otherParams.slice(0, index) : null;
};
const generateCastlabAuthToken = (contentKeyData: string, sessionId: string, user: string) => {
  const livekeyTemplate = process.env.DIVA_PLAYER_CASTLAB_LIVEKEY_TEMPLATE ?? '';
  const appProdKey = process.env.DIVA_PLAYER_CASTLAB_APP_PROD_KEY ?? '';
  const merchantName = process.env.DIVA_PLAYER_MERCHANT_NAME ?? '';
  const session = sessionId || null;

  const opt = {
    userId: user,
    merchant: merchantName,
    sessionId: session,
  };

  const crt = [
    {
      assetId: contentKeyData,
      ref: livekeyTemplate,
    },
  ];

  const secret = Buffer.from(appProdKey, 'base64');

  const claims = {
    crt: JSON.stringify(crt),
    optData: JSON.stringify(opt),
    iat: Math.floor(Date.now() / 1000),
    jti: uuid.v4(),
  };

  return jwt.sign(claims, secret, { algorithm: 'HS512' });
};

const generateTokenizedURL = (url: string, key: string, expirationWindow: number) => {
  const config = {
    tokenAlgorithm: 'sha256',
    key: '',
    startTime: Math.floor(Date.now() / 1000),
    window: expirationWindow,
    acl: '*',
    fieldDelimiter: '~',
  };

  setKey(config, key);

  return generateAkamaiToken(config, url, 'hdnts');
};

const setKey = (config: any, value: any) => {
  if (!value || value.length % 2 !== 0 || !/^[a-zA-Z0-9]+$/.test(value)) {
    throw new Error('AKAMAI KEY is not valid');
  }
  config.key = value;
};

const generateAkamaiToken = (config: any, url: string, param: string) => {
  const arg = generate(config);
  if (url.indexOf('?') > 0) {
    return `${url}&${param}=${arg}`;
  }
  return `${url}?${param}=${arg}`;
};

const generate = (config: any) => {
  const text = [
    `st=${config.startTime}${config.fieldDelimiter}`,
    `exp=${config.startTime + config.window}${config.fieldDelimiter}`,
    `acl=${config.acl}${config.fieldDelimiter}`,
  ].join('');

  const arg = calculateHMAC(
    text.replace(new RegExp(config.fieldDelimiter + '+$'), ''),
    config.key,
    config.tokenAlgorithm
  );

  return `${text}hmac=${arg}`;
};

const calculateHMAC = (data: string, key: string, algorithm: string) => {
  const hmac = crypto.createHmac(algorithm, hexStringToByteArray(key));
  return hmac.update(data, 'ascii').digest('hex');
};

const hexStringToByteArray = (hexString: string) => {
  let numBytes = hexString.length / 2;
  let byteArray = new Uint8Array(numBytes);

  for (let i = 0; i < numBytes; i++) {
    byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return byteArray;
};
