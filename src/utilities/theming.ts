import { Metadata } from "@/models/types/pageStructure";

export const renderThemingVariables = (items: Metadata[]) => {
  const themingItems = items.filter((item) => item.category === "theming");
  const cssString = themingItems
    .map((item) => `--d3-theme-${item.key}: ${item.value};`)
    .join(" ");

  return `:root{ ${cssString} }`;
};