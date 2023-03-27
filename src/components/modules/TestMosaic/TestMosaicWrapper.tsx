import { ComponentProps } from "@/models/types/components";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const TestMosaicList = dynamic(() => import("@/components/modules/TestMosaic/index"));

const TestMosaicListWrapper = ({...data}: ComponentProps): React.ReactElement => {
  return <TestMosaicList {...data} />;
};

const render = ( {...data} : ComponentProps): React.ReactElement =>
data ? <TestMosaicListWrapper key={nanoid()} {...data} /> : <></>;

export default render;
