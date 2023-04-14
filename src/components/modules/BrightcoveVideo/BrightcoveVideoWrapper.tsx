import { ComponentProps } from "@/models/types/components";
import dynamic from "next/dynamic";
import React from "react";
import {nanoid} from "nanoid";

// @ts-ignore
const BrightcoveVideo = dynamic(() => import("@/components/modules/BrightcoveVideo/index"));

const BrightcoveVideoWrapper = ({...props}: ComponentProps): React.ReactElement => {
  return <BrightcoveVideo {...props} />;
};

const render = ({...props} : ComponentProps): React.ReactElement =>
  props ? <BrightcoveVideoWrapper key={nanoid()} {...props} /> : <div />;

export default render;
