import { FormFields, FormEntity } from '@/models/types/forgeCustomEntityFields';
import { emptyDistributionEntity } from '@/__mocks__/entities/sampleStoryParts';

const sampleFormFields: FormFields = {
  description: 'description',
  inputFields: [
    {
      fieldType: 0,
      required: true,
      items: [],
      name: 'name',
      label: 'Name',
      placeholder: 'Insert your name here',
    },
    {
      fieldType: 0,
      required: true,
      items: [],
      name: 'surname',
      label: 'Surname',
      placeholder: 'Insert your surname here',
    },
    {
      fieldType: 4,
      required: true,
      items: [],
      name: 'email',
      label: 'Email',
      placeholder: 'Insert your email here',
    },
    {
      fieldType: 3,
      required: false,
      items: [],
      name: 'phone',
      label: 'Phone',
      placeholder: 'Insert your phone here',
    },
    {
      fieldType: 1,
      required: true,
      items: [],
      name: 'message',
      label: 'Your message',
      placeholder: 'Insert a comment here',
    },
    {
      fieldType: 2,
      required: true,
      items: [],
      name: 'message',
      label: 'Select a date',
      placeholder: 'Select a date placeholder',
    },
    {
      fieldType: 8,
      required: false,
      items: [
        {
          index: 8,
          value: 'valore 1-2',
          key: 'valore-1-2',
        },
        {
          index: 8,
          value: 'valore 2-2',
          key: 'valore-2-2',
        },
      ],
      name: 'combo-2',
      label: 'Combobox 2',
    },
    {
      fieldType: 9,
      required: true,
      items: [
        {
          index: 9,
          value: "Questa opzione si rompe al trigger dell'errore: under testing",
          key: 'option1',
        },
        {
          index: 9,
          value: 'opzione2',
          key: 'opzione2',
        },
        {
          index: 9,
          value: 'opt3',
          key: 'opt3',
        },
      ],
      name: 'check',
      label: 'Scegli due opzioni',
      placeholder: '',
    },
    {
      fieldType: 10,
      required: false,
      items: [
        {
          index: 10,
          value: 'radio1',
          key: 'radio1',
        },
        {
          index: 10,
          value: 'radio2',
          key: 'radio2',
        },
      ],
      name: 'radio',
      label: 'Scegli',
      placeholder: '',
    },
    {
      fieldType: 7,
      required: false,
      items: [],
      name: 'file',
      label: 'Allega',
    },
  ],
  submitActionLabel: 'submitActionLabel',
  senderEmail: 'senderEmail',
  subjectEmail: 'subjectEmail',
  bodyEmail: 'bodyEmail',
  subjectResponseEmail: 'subjectResponseEmail',
  bodyResponseEmail: 'bodyResponseEmail',
  sendResponseEmail: true,
  sendResponseEmailFormFieldName: 'sendResponseEmailFormFieldName',
  receiverEmail: 'receiverEmail',
};

const sampleForm: FormEntity = {
  ...emptyDistributionEntity,
  ...sampleFormFields,
  fields: {
    ...sampleFormFields,
  },
};

export { sampleForm };
