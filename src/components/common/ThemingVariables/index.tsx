import { Metadata } from "@/models/types/pageStructure";
import { renderThemingVariables } from "@/utilities/theming";

type ThemingVariablesProps = {
  metadata: Metadata[];
};

const ThemingVariables = ({ metadata }: ThemingVariablesProps) => (
  <>
    <style>{renderThemingVariables(metadata)}</style>
  </>
);

export default ThemingVariables;
