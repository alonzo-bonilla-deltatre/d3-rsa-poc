import { Tag } from "@/models/types/dapi";
import { nanoid } from "nanoid";

type CardRooflineProps = {
  context: Tag;
  hide: boolean;
};


const CardRoofline = ({ ...props }: CardRooflineProps) => {
  return props.context && (
    <div className="flex">
      <span
        key={nanoid()}
        className="uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit"
      >
        {props.context.title}
      </span>
    </div>
  );
};

export default CardRoofline;
