import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type AuthorProps = {
  author?: string;
  hide?: boolean;
};

const Author = ({ ...props }: AuthorProps) => {
  return !getBooleanProperty(props.hide) && props.author ? (
    <div className="mb-3 text-sm font-light text-[#BEBEBE]">{props.author}</div>
  ) : (
    <></>
  );
};

export default Author;
