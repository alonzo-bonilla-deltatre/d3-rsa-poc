'use client';

import useTranslate from '@/hooks/useTranslate';
import { TermType } from '@/models/types/translations';

type TranslateLabelProps = {
  translationTermKey: string;
  translationTermType?: TermType;
};

export const TranslatedLabel = ({ translationTermType, translationTermKey }: TranslateLabelProps) => {
  const translate = useTranslate();
  return <>{translate(translationTermKey, translationTermType)}</>;
};

export default TranslatedLabel;
