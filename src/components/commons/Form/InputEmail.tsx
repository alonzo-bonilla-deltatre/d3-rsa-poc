'use client';

import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { FieldProps } from '@/models/types/components/commons/form';

const InputEmail = ({ field }: FieldProps) => {
  if (!field || !field.name) return null;
  return (
    <div className="form__field">
      <label htmlFor={field.name}>{`${field.label}${field.required ? '*' : ''}`}</label>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 dark:text-grey-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <input
          type="email"
          name={field.name}
          className="pl-10 p-2.5"
          placeholder={field.placeholder}
          required={field.required}
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />
        <span className="invalid-message">
          {field.required && (
            <span>
              <TranslatedLabel translationTermKey="required-field" />
            </span>
          )}
          <span>
            <TranslatedLabel translationTermKey="required-email" />
          </span>
        </span>
      </div>
    </div>
  );
};

export default InputEmail;
