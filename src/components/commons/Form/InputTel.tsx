'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { getDefaultInputPattern } from '@/helpers/formHelper';
import { FieldProps } from '@/models/types/components/commons/form';

const InputTel = ({ field }: FieldProps) => {
  if (!field || !field.name) {
    return null;
  }
  const pattern = field.pattern ? field.pattern : getDefaultInputPattern(field.fieldType);
  const patternLabel = field.patternLabel ? field.patternLabel : 'Must contain only number';
  return (
    <div className="form__field">
      <label htmlFor={field.name}>{`${field.label}${field.required ? '*' : ''}`}</label>
      <input
        type="tel"
        name={field.name}
        pattern={pattern}
        placeholder={field.placeholder}
        required={field.required}
        title={patternLabel}
      />
      <span className="invalid-message">
        {field.required && (
          <span>
            <TranslatedLabel translationTermKey="required-field" />
          </span>
        )}
        {patternLabel ? <span>{patternLabel}</span> : null}
      </span>
    </div>
  );
};

export default InputTel;
