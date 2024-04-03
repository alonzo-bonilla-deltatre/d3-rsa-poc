'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { getDefaultInputPattern } from '@/helpers/formHelper';
import { FieldProps } from '@/models/types/components/commons/form';

const InputPassword = ({ field }: FieldProps) => {
  if (!field || !field.name) {
    return null;
  }
  const pattern = field.pattern ? field.pattern : getDefaultInputPattern(field.fieldType);
  const patternLabel = field.patternLabel
    ? field.patternLabel
    : 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters';
  return (
    <div className="form__field">
      <label
        htmlFor={field.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {`${field.label}${field.required ? '*' : ''}`}
      </label>
      <input
        type="password"
        name={field.name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={field.placeholder ? field.placeholder : '*******'}
        required={field.required}
        pattern={pattern}
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

export default InputPassword;
