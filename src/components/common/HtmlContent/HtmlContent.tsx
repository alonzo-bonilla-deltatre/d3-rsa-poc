import '@/components/common/HtmlContent/markdown.css';

type HtmlContentProps = {
  content?: string;
  className?: string;
  fromMarkdown?: boolean;
};

const HtmlContent = ({ content, className, fromMarkdown }: HtmlContentProps) => {
  return (
    <div className={`${!fromMarkdown ? 'd3-markdown w-full' : ''}`}>
      <div
        className={'htmlcontent-code w-full ' + (className ? className : '')}
        dangerouslySetInnerHTML={{ __html: content ? content : '' }}
      />
    </div>
  );
};
export default HtmlContent;
