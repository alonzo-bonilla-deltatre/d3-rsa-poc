type AuthorProps = {
  author?: string;
  hide?: boolean;
  className?: string;
};

const Author = ({ author, hide, className }: AuthorProps) => {
  if (hide || !author) {
    return null;
  }
  return <div className={`mb-3 text-sm font-light text-[#BEBEBE] ${className}`}>{author}</div>;
};

export default Author;
