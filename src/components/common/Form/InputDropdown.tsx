'use client';

import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
import { FormFieldItem } from '@/models/types/forge.customEntityFields';
import { FieldProps } from '@/models/types/components/common/form';

const InputDropdown = ({ field }: FieldProps) => {
  if (!field) return null;
  return (
    <div className="form__field">
      <label htmlFor={field.name}>{`${field.label}${field.required ? '*' : ''}`}</label>
      <select
        name={field.name}
        required={field.required}
      >
        {field?.items?.map((item: FormFieldItem, index: number) => {
          return (
            <option
              key={`${item.key}-${index}`}
              value={item.key}
            >
              {item.value}
            </option>
          );
        })}
      </select>
      <span className="invalid-message">
        {field.required && (
          <span>
            <TranslatedLabel translationTermKey="required-field" />
          </span>
        )}
      </span>
    </div>
  );
};

export default InputDropdown;
