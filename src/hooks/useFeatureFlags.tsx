import { FeatureFlagsContext } from '@/contexts/featureFlagsContext';
import { useContext } from 'react';

/**
 * React hook for accessing feature flags.
 *
 * This hook uses the React context API to provide access to feature flags
 * anywhere in the component tree without having to pass them down through props.
 *
 * @returns {Record<string, boolean>} An object containing the feature flags.
 */
export const useFeatureFlags = (): Record<string, boolean> => useContext(FeatureFlagsContext);
