import { EnvVarContext } from '@/context/envVarsContexts';
import { useContext } from 'react';

/**
 * React hook for accessing environment variables.
 *
 * This hook uses the React context API to provide access to environment variables
 * anywhere in the component tree without having to pass them down through props.
 *
 * @returns {Record<string, any>} An object containing the environment variables.
 */
export const useEnvVars = (): Record<string, any> => useContext(EnvVarContext);
