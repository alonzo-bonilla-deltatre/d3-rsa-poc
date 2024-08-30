/* istanbul ignore file */
import { convertStringToBoolean } from '@/helpers/dataVariableHelper';

/**
 * The environment variable FLAG_ENABLE_TEST_VALUE.
 * @type {string | undefined}
 */
const { FLAG_ENABLE_TEST_VALUE } = process.env;

/**
 * An object that maps feature flag names to their boolean values.
 *
 * This object is used to enable or disable certain features in the application.
 * The values of the feature flags are determined by environment variables.
 * The environment variables are converted to boolean values using the convertStringToBoolean function.
 * If an environment variable is not provided, its corresponding feature flag set to false.
 *
 * @type {Record<string, boolean>}
 */
export const featureFlags: Record<string, boolean> = {
  FLAG_ENABLE_TEST: convertStringToBoolean(FLAG_ENABLE_TEST_VALUE ?? 'false'),
};
