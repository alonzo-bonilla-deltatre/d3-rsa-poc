'use client';

import React, { createContext } from 'react';

/**
 * Context for environment variables.
 *
 * This context provides a way to pass environment variables down the component tree
 * without having to pass props down manually at every level.
 *
 * @type {React.Context<Record<string, string | number | boolean | undefined>>}
 */
export const EnvVarContext = createContext<Record<string, string | number | boolean | undefined>>({});

/**
 * Provider component for the environment variables context.
 *
 * This component takes environment variables and children as props, and returns a context provider
 * that passes the environment variables to all children in the component tree.
 *
 * @param {object} props - The props for the component.
 * @param {Record<string, string | number | boolean | undefined>} props.envVars - The environment variables to pass down the component tree.
 * @param {React.ReactNode} props.children - The child components to render.
 *
 * @returns {React.ReactElement} A context provider that passes the environment variables to all children.
 */
export const EnvVarsProvider = ({
  envVars,
  children,
}: {
  envVars: Record<string, string | number | boolean | undefined>;
  children: React.ReactNode;
}): React.ReactElement => {
  return <EnvVarContext.Provider value={envVars}>{children}</EnvVarContext.Provider>;
};
