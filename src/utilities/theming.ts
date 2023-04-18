import { Metadata } from "@/models/types/pageStructure";
import * as process from "process";

const themingSuffixName = process.env.THEMING_SUFFIX_NAME ?? "d3";

export const renderThemingVariables = (items: Metadata[]) => {
  const themingItems = items.filter((item) => item.category === "theming");
  const cssString = themingItems
    .map((item) => `--${themingSuffixName.toLowerCase()}-theme-${item.key}: ${item.value};`)
    .join(" ");

  return `:root{ ${cssString} }`;
};