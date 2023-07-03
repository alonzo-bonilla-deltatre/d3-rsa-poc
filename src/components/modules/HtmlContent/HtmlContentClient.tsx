'use client';

type ModuleProps = {
  content: string;
  classNames?: string;
};

const HtmlContentClient = ({ content, classNames }: ModuleProps) => {
  return (
    <div
      className={'htmlcontent-code w-full' + (classNames ?? '')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
export default HtmlContentClient;
