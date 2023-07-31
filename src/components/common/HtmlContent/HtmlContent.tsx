type ModuleProps = {
  content?: string;
  classNames?: string;
};

const HtmlContent = ({ ...props }: ModuleProps) => {
  const { content, classNames } = props;
  return (
    <div
      className={'htmlcontent-code w-full' + (classNames ?? '')}
      dangerouslySetInnerHTML={{ __html: content ? content : '' }}
    />
  );
};
export default HtmlContent;
