import { ComponentProps } from "@/models/types/components";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const BrightcoveVideo = dynamic(() => import("@/components/modules/BrightcoveVideo/index"));

const BrightcoveVideoWrapper = ({...data}: ComponentProps): React.ReactElement => {
  return <BrightcoveVideo {...data} />;
};

const render = ( {...data} : ComponentProps): React.ReactElement =>
data ? <BrightcoveVideoWrapper key={nanoid()} {...data} /> : <></>;

export default render;
