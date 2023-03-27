import { ComponentProps } from "@/models/types/components";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const Story = dynamic(() => import("@/components/modules/Story/index"));

const StoryWrapper = ({...data}: ComponentProps): React.ReactElement => {
  return <Story {...data} />;
};

const render = ( {...data} : ComponentProps): React.ReactElement =>
data ? <StoryWrapper key={nanoid()} {...data} /> : <></>;

export default render;
