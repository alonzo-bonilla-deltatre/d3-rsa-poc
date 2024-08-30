'use client';

import { Context, createContext, ReactElement, ReactNode } from 'react';

type FeatureFlagsContextType = Record<string, boolean>;

/**
 * Context for feature flags.
 *
 * This context provides a way to pass feature flags down the component tree
 * without having to pass props down manually at every level.
 *
 * @type {Context<Record<string, boolean>>}
 */
export const FeatureFlagsContext: Context<Record<string, boolean>> = createContext<FeatureFlagsContextType>({});

/**
 * Provider component for the feature flags context.
 *
 * This component takes feature flags and children as props, and returns a context provider
 * that passes the feature flags to all children in the component tree.
 *
 * @param {object} props - The props for the component.
 * @param {Record<string, boolean>} props.featureFlags - The feature flags to pass down the component tree.
 * @param {ReactNode} props.children - The child components to render.
 *
 * @returns {ReactElement} A context provider that passes the feature flags to all children.
 */
export const FeatureFlagsProvider = ({
  featureFlags,
  children,
}: {
  featureFlags: FeatureFlagsContextType;
  children: ReactNode;
}): ReactElement => {
  return <FeatureFlagsContext.Provider value={featureFlags}>{children}</FeatureFlagsContext.Provider>;
};
