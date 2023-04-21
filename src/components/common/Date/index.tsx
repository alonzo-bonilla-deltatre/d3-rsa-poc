import { formatDate } from '@/utilities/dateFormatter';

type DateProps = {
  date: string;
  format: string | null;
  hide: boolean;
};

const Date = ({ ...props }: DateProps) => {
  return props.date ? <time className="mb-3 text-sm font-light text-[#BEBEBE]">{formatDate(props.date)}</time> : <></>;
};

export default Date;
