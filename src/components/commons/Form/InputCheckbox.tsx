'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { FormFieldItem } from '@/models/types/forge.customEntityFields';
import { FieldProps } from '@/models/types/components/commons/form';

const InputCheckbox = ({ field }: FieldProps) => {
  if (!field || !field.name || !field?.items) return null;
  const fieldRequired = field.required ? '*' : '';
  return (
    <div className="form__field">
      {field.items?.map((item: FormFieldItem, index: number) => {
        return (
          <div
            className="flex items-center gap-4"
            key={`${item.key}-${index}`}
          >
            <input
              type="checkbox"
              name={`${field.name}-${item?.key?.toLowerCase()}`}
              className="w-4 h-4 flex-shrink-0"
              placeholder={field.placeholder}
              required={field.required}
            />
            <div>
              <label htmlFor={item.key}>
                <span className="d3-ty-body-small font-normal normal-case">
                  {item.value}
                  {fieldRequired}
                </span>
              </label>
              <span className="invalid-message">
                {field.required && (
                  <span>
                    <TranslatedLabel translationTermKey="required-field" />
                  </span>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InputCheckbox;
