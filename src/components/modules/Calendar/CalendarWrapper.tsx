import { ComponentProps } from "@/models/types/components";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const Calendar = dynamic(() => import("@/components/modules/Calendar/index"));

const CalendarWrapper = ({...data}: ComponentProps): React.ReactElement => {
  return <Calendar {...data} />;
};

const render = ( {...data} : ComponentProps): React.ReactElement =>
data ? <CalendarWrapper key={nanoid()} {...data} /> : <></>;

export default render;
