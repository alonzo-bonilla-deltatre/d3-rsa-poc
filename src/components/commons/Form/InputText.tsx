'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { FieldProps } from '@/models/types/components/commons/form';

const InputText = ({ field }: FieldProps) => {
  if (!field || !field.name) {
    return null;
  }
  return (
    <div className="form__field">
      <label htmlFor={field.name}>{`${field.label}${field.required ? '*' : ''}`}</label>
      <input
        type="text"
        name={field.name}
        placeholder={field?.placeholder}
        required={field.required}
        defaultValue={field?.default}
        maxLength={field.maxLength && field.maxLength > 0 ? field.maxLength : undefined}
      />

      <span className="invalid-message">
        {field.required && <TranslatedLabel translationTermKey="required-field" />}
      </span>
    </div>
  );
};

export default InputText;
