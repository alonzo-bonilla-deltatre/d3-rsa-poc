'use client';

import TranslateLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
import {
  getBooleanProperty,
  getHeadingTag,
  getHeadingTagNumber,
  getStringProperty,
} from '@/helpers/pageComponentPropertyHelper';
import useTranslate from '@/hooks/useTranslate';
import { HeaderTitleProps } from '@/models/types/components';
import CallToAction from '@/components/common/CallToAction/CallToAction';

const HeaderTitle = ({
  headerTitle,
  headerTitleHeadingLevel,
  hideHeaderTitle,
  ctaTitle,
  ctaLink,
  className,
  typographyClassName,
  noTranslation,
  sponsorBy,
  textAlignment,
  description,
}: HeaderTitleProps) => {
  const HeadingTag = getHeadingTag(headerTitleHeadingLevel, 'h2') as keyof JSX.IntrinsicElements;
  const translate = useTranslate();
  const typographyHeadingClassName = typographyClassName
    ? typographyClassName
    : `d3-ty-heading-${getHeadingTagNumber(headerTitleHeadingLevel)}`;
  const headingClassName = `${typographyHeadingClassName} text-component-common-header-title-light dark:text-component-common-header-title-dark`;

  if (!headerTitle) {
    return null;
  }
  noTranslation = getBooleanProperty(noTranslation);
  return (
    <div
      className={`${getStringProperty(className)} flex items-center justify-between gap-2 lg:gap-6 text-component-common-header-title-light dark:text-component-common-header-title-dark`}
    >
      <HeadingTag className={`${getBooleanProperty(hideHeaderTitle) ? 'hidden' : headingClassName} `}>
        {noTranslation ? headerTitle : <TranslateLabel translationTermKey={headerTitle} />}
      </HeadingTag>
      {ctaLink && ctaTitle && (
        <CallToAction
          url={ctaLink}
          text={translate(ctaTitle)}
          isExternal={false}
          style="primary"
          hide={false}
          className="ml-auto lg:ml-0"
        />
      )}
    </div>
  );
};

export default HeaderTitle;
