type CardTitleProps = {
  title: string;
  heading: string | null;
  hide: boolean;
};


const CardTitle = ({ ...props }: CardTitleProps) => {

  const HeadingTag = `${
    props.heading ? props.heading.toLowerCase() : "h3"
  }` as keyof JSX.IntrinsicElements;

  return props.title ? (
    <HeadingTag className="my-2 mt-4 text-xl font-bold tracking-tight dark:text-white">
              {props.title}
            </HeadingTag>
  ) : <></> ;
};

export default CardTitle;
