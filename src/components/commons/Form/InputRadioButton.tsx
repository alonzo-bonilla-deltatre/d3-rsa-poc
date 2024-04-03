'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { FormFieldItem } from '@/models/types/forge.customEntityFields';
import { FieldProps } from '@/models/types/components/commons/form';

const InputRadioButton = ({ field }: FieldProps) => {
  if (!field || !field.name || !field?.items) {
    return null;
  }
  return (
    <div className="form__field">
      <label
        htmlFor={field.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {`${field.label}${field.required ? '*' : ''}`}
      </label>

      {field.items.map((item: FormFieldItem, index: number) => {
        return (
          <div
            className="flex items-center"
            key={index}
          >
            <input
              type="radio"
              value={item.value}
              name={field.name}
              className="w-4 h-4 flex-shrink-0"
              required={field.required}
            />
            <label
              htmlFor={item.key}
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item.value}
            </label>
            <span className="invalid-message">
              {field.required && <TranslatedLabel translationTermKey="required-field" />}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default InputRadioButton;
