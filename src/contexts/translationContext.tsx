'use client';

import { Context, createContext, ReactElement, ReactNode } from 'react';
import { Translation } from '@/models/types/translations';

/**
 * Context for translations.
 *
 * This context provides a way to pass translations down the component tree
 * without having to pass props down manually at every level.
 *
 * @type {Context<Record<string, Translation> | undefined>}
 */
export const TranslationContext: Context<Record<string, Translation> | undefined> = createContext<
  Record<string, Translation> | undefined
>(undefined);

/**
 * Provider component for the translations' context.
 *
 * This component takes translations and children as props, and returns a context provider
 * that passes the translations to all children in the component tree.
 *
 * @param {object} props - The props for the component.
 * @param {ReactNode} props.children - The child components to render.
 * @param {any} props.translations - The translations to pass down the component tree.
 * @returns {ReactElement} A context provider that passes the translations to all children.
 */
export const TranslationProvider = ({
  children,
  translations,
}: {
  children: ReactNode;
  translations: any;
}): ReactElement => <TranslationContext.Provider value={translations}>{children}</TranslationContext.Provider>;
