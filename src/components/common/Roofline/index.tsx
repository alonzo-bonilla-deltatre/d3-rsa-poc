import {Tag} from "@/models/types/dapi";
import {nanoid} from "nanoid";

type RooflineProps = {
  context: Tag;
  hide: boolean;
  className?: string;
};

const defaultClassName = "uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit";

const Roofline = ({...props}: RooflineProps) => {
  return props.context && (
    <div
      key={nanoid()}
      className={props.className ?? defaultClassName}
    >
      {props.context.title}
    </div>
  );
};

export default Roofline;
