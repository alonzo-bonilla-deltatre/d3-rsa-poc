import { ComponentProps } from "@/models/types/components";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const Hero = dynamic(() => import("@/components/modules/Hero/index"));

const HeroWrapper = ({...data}: ComponentProps): React.ReactElement => {
  return <Hero {...data} />;
};

const render = ( {...data} : ComponentProps): React.ReactElement =>
data ? <HeroWrapper key={nanoid()} {...data} /> : <></>;

export default render;
