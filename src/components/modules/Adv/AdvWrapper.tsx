import { ComponentProps } from "@/models/types/components";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const Adv = dynamic(() => import("@/components/modules/Adv")
);

const AdvWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <Adv {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? <AdvWrapper key={nanoid()} {...data} /> : <></>;

export default render;
