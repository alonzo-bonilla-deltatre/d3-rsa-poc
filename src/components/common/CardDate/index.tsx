import { formatDate } from "@/utilities/dateFormatter";

type CardDateProps = {
  date: string;
  format: string | null;
  hide: boolean;
};


const CardDate = ({ ...props }: CardDateProps) => {

  return props.date ? (
    <time className="mb-3 text-sm font-light text-[#BEBEBE]">
          {formatDate(props.date)}
        </time>
  ) : <></> ;
};

export default CardDate;
