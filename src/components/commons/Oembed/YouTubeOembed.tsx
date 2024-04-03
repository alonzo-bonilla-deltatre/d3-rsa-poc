type YouTubeOembedProps = {
  src: string;
};

const YouTubeOembed = ({ src }: YouTubeOembedProps) => {
  if (!src) return null;

  return (
    <div className="grid grid-cols-1 relative overflow-hidden w-full">
      <iframe
        allowFullScreen
        src={src}
        className="w-full h-full aspect-video"
      />
    </div>
  );
};

export default YouTubeOembed;
