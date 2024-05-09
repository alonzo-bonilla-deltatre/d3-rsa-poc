import { DistributionEntity } from './forge';

export type AccessibleLink = {
  displayText: string;
  accessibleText: string;
  url: string;
  openInNewTab: boolean;
};

export type DivaVideoFields = {
  description?: string;
  productionYear?: number;
  type?: string;
  videoDisplayText?: string;
  videoKind?: string;
  videoType?: string;
  videoId?: string;
  videoStatus?: string;
  videoDuration?: string;
  offer?: string;
  workflow?: string;
  restrictedCountries?: string[];
  v_has_data?: boolean;
};

export type FormEntity = DistributionEntity & FormFields;
export type FormFields = {
  description?: string;
  inputFields?: FormInputField[];
  submitActionLabel?: string;
  senderEmail?: string;
  subjectEmail?: string;
  bodyEmail?: string;
  subjectResponseEmail?: string;
  bodyResponseEmail?: string;
  sendResponseEmail?: boolean;
  sendResponseEmailFormFieldName?: string;
  receiverEmail?: string;
};

export type FormInputField = {
  fieldType: FormFieldType;
  required: boolean;
  items?: FormFieldItem[];
  name?: string;
  label?: string;
  default?: string;
  placeholder?: string;
  pattern?: string;
  patternLabel?: string;
  fileType?: string;
  maxLength?: number;
};

export enum FormFieldType {
  Text, //0
  LongText, //1
  Date,
  Phone,
  Email, //4
  Password,
  Divider,
  File,
  DropDown,
  Checkbox,
  RadioButton,
}

export type FormFieldItem = {
  index: number;
  key: string;
  value: string;
};
