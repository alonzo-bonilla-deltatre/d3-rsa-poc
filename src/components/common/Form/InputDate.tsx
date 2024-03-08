'use client';

import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
import { FieldProps } from '@/models/types/components/common/form';

const InputDate = ({ field }: FieldProps) => {
  if (!field || !field.name) return null;
  return (
    <div className="form__field">
      <label htmlFor={field.name}>{`${field.label}${field.required ? '*' : ''}`}</label>
      <input
        type="date"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
      />
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

export default InputDate;
