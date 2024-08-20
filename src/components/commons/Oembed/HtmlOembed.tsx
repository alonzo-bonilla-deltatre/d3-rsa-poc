import HtmlContent from '@/components/commons/HtmlContent/HtmlContent';

type OembedProps = {
  html: string;
};

const HtmlOembed = ({ html }: OembedProps) => {
  if (!html) return null;

  return (
    <div className="grid grid-cols-1 relative overflow-hidden w-full">
      <HtmlContent
        content={html}
        className="mx-auto flex flex-col items-center"
      />
    </div>
  );
};

export default HtmlOembed;
