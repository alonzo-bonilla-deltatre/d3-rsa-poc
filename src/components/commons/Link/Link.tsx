import { hasValidUrl, isExternalLink } from '@/helpers/urlHelper';
import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

type LinkComponentProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  Pick<LinkProps, 'as' | 'scroll' | 'shallow' | 'passHref' | 'prefetch' | 'locale' | 'legacyBehavior' | 'replace'> & {
    baseUrl?: string;
  };

const LinkComponent = ({ children, ...props }: LinkComponentProps) => {
  const { baseUrl, href, ...linkProps } = props;
  if (!href) {
    return null;
  }

  if (!hasValidUrl(href)) {
    return <div className={linkProps.className}>{children}</div>;
  }

  const isExternal = isExternalLink(href, baseUrl);

  const additionalLinkAttributes = {
    ...(isExternal && !props.rel ? { rel: 'noopener noreferrer' } : undefined),
    ...(isExternal && !props.target ? { target: '_blank' } : undefined),
  };

  return (
    <Link
      href={href}
      {...linkProps}
      {...additionalLinkAttributes}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
