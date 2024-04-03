import { Metadata } from '@/models/types/pageStructure';
import { renderThemingVariables } from '@/utilities/themingUtility';

type ThemingVariablesProps = {
  metadata: Metadata[];
};

const ThemingVariables = ({ metadata }: ThemingVariablesProps) => <style>{renderThemingVariables(metadata)}</style>;

export default ThemingVariables;
