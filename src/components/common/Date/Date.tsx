import { formatDate } from '@/utilities/dateFormatter';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type DateProps = {
  date?: string;
  format?: string | null;
  hide?: boolean;
};

const Date = ({ ...props }: DateProps) => {
  return !getBooleanProperty(props.hide) && props.date ? (
    <time className="mb-3 text-sm font-light text-[#BEBEBE]">{formatDate(props.date)}</time>
  ) : (
    <></>
  );
};

export default Date;
