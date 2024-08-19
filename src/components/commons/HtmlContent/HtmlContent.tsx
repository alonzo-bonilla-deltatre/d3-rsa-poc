'use client';

import styles from '@/components/commons/HtmlContent/HtmlContent.module.scss';

type HtmlContentProps = {
  content?: string;
  className?: string;
};

const HtmlContent = ({ content, className }: HtmlContentProps) => {
  return (
    <div
      className={`w-full ${styles.html_content} ${className ? className : ''}`}
      dangerouslySetInnerHTML={{ __html: content ? content : '' }}
    />
  );
};
export default HtmlContent;
