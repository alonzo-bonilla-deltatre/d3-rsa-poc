/* istanbul ignore file */
// Destructure and extract the CULTURE, LANGUAGE, and DIVA_PLAYER_VIDEO_SETTINGS_BASE_URL variables from the process.env object.
const { CULTURE, LANGUAGE, DIVA_PLAYER_VIDEO_SETTINGS_BASE_URL } = process.env;

/**
 * An object that holds the public environment variables.
 * @type {Record<string, string | number | boolean | undefined>}
 * @property {string | number | boolean | undefined} CULTURE - The culture setting from the environment variables.
 * @property {string | number | boolean | undefined} LANGUAGE - The language setting from the environment variables.
 * @property {string | number | boolean | undefined} DIVA_PLAYER_VIDEO_SETTINGS_BASE_URL - The base URL for video settings from the environment variables.
 */
const publicEnvVariables: Record<string, string | number | boolean | undefined> = {
  CULTURE,
  LANGUAGE,
  DIVA_PLAYER_VIDEO_SETTINGS_BASE_URL,
};

// Export the publicEnvVariables object.
export { publicEnvVariables };
