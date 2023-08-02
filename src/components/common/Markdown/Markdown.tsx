import { transform } from '@/helpers/markdownHelper';
import '@/components/common/Markdown/Markdown.scss';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';

type MarkdownProps = {
  markdownText?: string;

  classNames?: string;
};

const Markdown = async ({ ...props }: MarkdownProps) => {
  const { markdownText, classNames } = props;
  const html = await transform(markdownText);
  return props.markdownText ? (
    <>
      <HtmlContent
        content={html}
        classNames={classNames ? classNames : ''}
      />
    </>
  ) : (
    <></>
  );
};

export default Markdown;
