type YouTubeOembedProps = {
  src: string;
};

const YouTubeOembed = ({...props}: YouTubeOembedProps) => {
  const {src} = props as YouTubeOembedProps;

  return (
    src ? (
      <>
        <div className="grid grid-cols-1 relative overflow-hidden w-full pt-[56.25%]">
          <iframe
            allowFullScreen
            src={src}
            className="w-full h-full absolute"
          />
        </div>
      </>
    ) : <></>
  );
};

export default YouTubeOembed;