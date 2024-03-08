export type Translations = {
  mainLanguage: string;
  languages: string[];
  resources: Record<string, Resource>;
};

export type Resource = {
  translation: Record<string, Translation>;
};

export type Translation = {
  standard: string;
  short: string;
};

export enum TermType {
  standard = 'standard',
  short = 'short',
}
