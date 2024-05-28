'use client';

import TranslateLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { getBooleanProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import useTranslate from '@/hooks/useTranslate';
import { HeaderTitleProps } from '@/models/types/components';
import CallToAction from '@/components/commons/CallToActionLink/CallToActionOutlinedLink';
import Typography, { TypographyVariant } from '@/components/commons/Typography/Typography';

const HeaderTitle = ({
  headerTitle,
  headerTitleHeadingLevel,
  hideHeaderTitle,
  ctaTitle,
  ctaLink,
  className,
}: HeaderTitleProps) => {
  const headingTag =
    headerTitleHeadingLevel && headerTitleHeadingLevel !== 'undefined'
      ? getStringProperty(headerTitleHeadingLevel?.toLowerCase())
      : 'h2';
  const translate = useTranslate();

  if (!headerTitle) {
    return null;
  }
  return (
    <div className={`${getStringProperty(className)} flex items-center justify-between gap-2 lg:gap-6 text-white`}>
      <Typography
        variant={headingTag as TypographyVariant}
        className={getBooleanProperty(hideHeaderTitle) ? 'hidden' : ''}
      >
        <TranslateLabel translationTermKey={headerTitle} />
      </Typography>
      {ctaLink && ctaTitle && (
        <CallToAction
          url={ctaLink}
          text={translate(ctaTitle)}
        />
      )}
    </div>
  );
};

export default HeaderTitle;
