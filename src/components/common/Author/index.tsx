type AuthorProps = {
  author: string;
  hide: boolean;
};

const Author = ({ ...props }: AuthorProps) => {
  return props.author && !props.hide ? (
    <div className="mb-3 text-sm font-light text-[#BEBEBE]">{props.author}</div>
  ) : (
    <></>
  );
};

export default Author;
