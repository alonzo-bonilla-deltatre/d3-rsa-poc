import HtmlContent from '@/components/commons/HtmlContent/HtmlContent';

type OembedProps = {
  html: string;
};

const HtmlOembed = ({ html }: OembedProps) => {
  if (!html) return null;

  return (
    <div className="relative grid w-full grid-cols-1 overflow-hidden">
      <HtmlContent
        content={html}
        className="mx-auto flex flex-col items-center"
      />
    </div>
  );
};

export default HtmlOembed;
