import { Resource } from 'i18next';

export type Translations = {
  mainLanguage: string;
  languages: string[];
  resources: Resource;
};

export type Translation = {
  standard: string;
  short: string;
};

export enum TermType {
  standard = 'standard',
  short = 'short',
}
