import Oembed from "@/components/common/Oembed";
import { StoryPart } from "@/models/types/storyPart";
import React from "react";

const renderStoryPart = ({ ...data }: StoryPart): React.ReactElement =>
  data ? <Oembed entity={data} /> : <></>;

export default renderStoryPart;