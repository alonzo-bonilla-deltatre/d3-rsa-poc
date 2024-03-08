/* istanbul ignore file */
const { CULTURE, LANGUAGE, VIDEO_SETTINGS_BASE_URL } = process.env;

const publicEnvVariables: Record<string, string | number | boolean | undefined> = {
  CULTURE,
  LANGUAGE,
  VIDEO_SETTINGS_BASE_URL,
};

export { publicEnvVariables };
