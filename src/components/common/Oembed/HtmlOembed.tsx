import HtmlContent from '@/components/common/HtmlContent/HtmlContent';

type OembedProps = {
  html: string;
};

const HtmlOembed = ({ ...props }: OembedProps) => {
  const { html } = props as OembedProps;

  return html ? (
    <>
      <div className="grid grid-cols-1 relative overflow-hidden w-full">
        <HtmlContent
          content={html}
          classNames={'mx-auto flex flex-col items-center'}
        />
      </div>
    </>
  ) : (
    <></>
  );
};

export default HtmlOembed;
