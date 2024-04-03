'use client';

import React, { createContext } from 'react';
import { Translation } from '@/models/types/translations';

/**
 * Context for translations.
 *
 * This context provides a way to pass translations down the component tree
 * without having to pass props down manually at every level.
 *
 * @type {React.Context<Record<string, Translation> | undefined>}
 */
export const TranslationContext = createContext<Record<string, Translation> | undefined>(undefined);

/**
 * Provider component for the translations context.
 *
 * This component takes translations and children as props, and returns a context provider
 * that passes the translations to all children in the component tree.
 *
 * @param {object} props - The props for the component.
 * @param {React.ReactNode} props.children - The child components to render.
 * @param {any} props.translations - The translations to pass down the component tree.
 * @returns {React.ReactElement} A context provider that passes the translations to all children.
 */
export const TranslationProvider = ({ children, translations }: { children: React.ReactNode; translations: any }) => (
  <TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>
);
