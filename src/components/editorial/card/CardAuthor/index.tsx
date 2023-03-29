type CardAuthorProps = {
  author: string;
  hide: boolean;
};


const CardAuthor = ({ ...props }: CardAuthorProps) => {

  return props.author && !props.hide ? (
    <div className="mb-3 text-sm font-light text-[#BEBEBE]">
      {props.author}
    </div>
  ) : <></>;
};

export default CardAuthor;
