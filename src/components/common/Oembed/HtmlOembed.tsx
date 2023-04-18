type OembedProps = {
  html: string;
};

const HtmlOembed = ({...props}: OembedProps) => {
  const {html} = props as OembedProps;


  return (
    html ? (
      <>
        <div className="grid grid-cols-1 relative overflow-hidden w-full">
          <div className="w-full mx-auto flex flex-col items-center"
               dangerouslySetInnerHTML={{__html: html}}/>
        </div>
      </>
    ) : <></>
  );
};

export default HtmlOembed;