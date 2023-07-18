type AuthorProps = {
  author?: string;
  hide?: boolean;
};

const Author = ({ ...props }: AuthorProps) => {
  return (props.hide === undefined || props.hide?.toString() === 'false') && props.author ? (
    <div className="mb-3 text-sm font-light text-[#BEBEBE]">{props.author}</div>
  ) : (
    <></>
  );
};

export default Author;
