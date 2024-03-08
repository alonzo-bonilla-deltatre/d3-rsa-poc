'use client';
import TranslatedLabel from '@/components/common/TranslatedLabel/TranslatedLabel';
import { ComponentPropsWithRef } from 'react';
import { FieldProps } from '@/models/types/components/common/form';

type InputFileProps = FieldProps & ComponentPropsWithRef<'input'>;

const InputFile = ({ data }: { data: InputFileProps }) => {
  const field = data.field;
  if (!field || !field.name) {
    return null;
  }
  const fileType = field.fileType ? field.fileType : 'image/jpeg,image/gif,image/png,application/pdf';
  return (
    <div className="form__field">
      <label htmlFor={field.name}>{`${field.label}${field.required ? '*' : ''}`}</label>
      <input
        className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700  focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200  dark:file:text-neutral-100 dark:focus:border-primary"
        type="file"
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        accept={fileType}
        onChange={data.onChange}
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

export default InputFile;
