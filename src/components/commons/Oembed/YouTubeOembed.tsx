type YouTubeOembedProps = {
  src: string;
};

const YouTubeOembed = ({ src }: YouTubeOembedProps) => {
  if (!src) return null;

  return (
    <div className="relative grid w-full grid-cols-1 overflow-hidden rounded-lg">
      <iframe
        allowFullScreen
        src={src}
        className="aspect-video h-full w-full"
      />
    </div>
  );
};

export default YouTubeOembed;
