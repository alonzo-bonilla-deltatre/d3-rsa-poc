type MarkdownProps = {
  markdownText: string;
};


const Markdown = ({ ...props }: MarkdownProps) => {

  return props.markdownText ? (
    <>
      <div className="text-white prose lg:prose-xl mt-20 mx-60 col-start-1">
        {props.markdownText}
      </div>
    </>
  ) : <></>;
};


export default Markdown;
