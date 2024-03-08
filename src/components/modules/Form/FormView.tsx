'use client';

import AlertMessage from '@/components/common/AlertMessage/AlertMessage';
import FormDivider from '@/components/common/Form/FormDivider';
import InputCheckbox from '@/components/common/Form/InputCheckbox';
import InputDate from '@/components/common/Form/InputDate';
import InputDropdown from '@/components/common/Form/InputDropdown';
import InputEmail from '@/components/common/Form/InputEmail';
import InputFile from '@/components/common/Form/InputFile';
import InputPassword from '@/components/common/Form/InputPassword';
import InputRadioButton from '@/components/common/Form/InputRadioButton';
import InputTel from '@/components/common/Form/InputTel';
import InputText from '@/components/common/Form/InputText';
import InputTextArea from '@/components/common/Form/InputTextArea';
import SubmitButton from '@/components/common/Form/SubmitButton';
import Toast from '@/components/common/Toast/Toast';
import { validateField, validateFilesClient } from '@/helpers/formHelper';
import { DistributionEntity } from '@/models/types/forge';
import { FormEntity, FormFieldType, FormInputField } from '@/models/types/forge.customEntityFields';
import { LoggerLevel } from '@/models/types/logger';
import logger from '@/utilities/logger';
import axios from 'axios';
import dynamic from 'next/dynamic';
import React, { FormEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
const Markdown = dynamic(() => import('@/components/common/Markdown/Markdown'));

type FormViewProps = {
  entity: DistributionEntity;
  formData: FormEntity;
  siteKey?: string;
  className?: string;
};

const getFormFields = (
  inputFields: FormInputField[],
  handleFileSelected: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  const formFields: React.JSX.Element[] = [];
  let dividerKey = 0;
  inputFields.map((field: FormInputField) => {
    switch (field.fieldType) {
      case FormFieldType.Text:
        formFields.push(
          <InputText
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.LongText:
        formFields.push(
          <InputTextArea
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.Date:
        formFields.push(
          <InputDate
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.Phone:
        formFields.push(
          <InputTel
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.Email:
        formFields.push(
          <InputEmail
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.Password:
        formFields.push(
          <InputPassword
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.Divider:
        formFields.push(
          <FormDivider
            field={field}
            key={`divider-${dividerKey}`}
          />
        );
        dividerKey++;
        break;
      case FormFieldType.File:
        formFields.push(
          <InputFile
            data={{
              field: field,
              onChange: handleFileSelected,
            }}
            key={field.name}
          />
        );
        break;
      case FormFieldType.DropDown:
        formFields.push(
          <InputDropdown
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.Checkbox:
        formFields.push(
          <InputCheckbox
            field={field}
            key={field.name}
          />
        );
        break;
      case FormFieldType.RadioButton:
        formFields.push(
          <InputRadioButton
            field={field}
            key={field.name}
          />
        );
        break;
      default:
        formFields.push(
          <InputText
            field={field}
            key={field.name}
          />
        );
        break;
    }
  });
  return formFields;
};

const FormView = ({ entity, formData, siteKey, className }: FormViewProps) => {
  const recaptcha: RefObject<ReCAPTCHA> = useRef(null);
  const [captchaToken, setCaptchaToken] = useState('');
  const [formFields, setFormFields] = useState<React.JSX.Element[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, { data: File[]; accept: string }>>({});
  const refForm = useRef<HTMLFormElement | null>(null);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setFiles({ [e.target.name]: { data: _files, accept: e.target.accept } });
    }
  };

  const onCaptchaChange = (token: string | null) => {
    if (token) {
      setCaptchaToken(token);
    }
  };

  const handleValidation = () => {
    setIsValidating(true);
  };

  const initForm = useCallback(() => {
    const formFieldsValues = getFormFields(formData.inputFields || [], handleFileSelected);
    setFormFields(formFieldsValues as React.JSX.Element[]);
  }, [formData.inputFields]);

  useEffect(() => {
    initForm();
  }, [initForm]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const formDataValues = new FormData(event.currentTarget);
      let isFormValid = true;
      let form = new FormData();

      // @ts-ignore
      for (const [key, value] of formDataValues.entries()) {
        if (value) {
          // @ts-ignore
          const entityField = formData.fields.inputFields.find((field) => field.name === key);
          if (entityField && entityField.name) {
            if (
              !validateField({
                name: entityField.name,
                value: value as string,
                maxLength: entityField.maxLength,
                required: entityField.required,
                fieldType: entityField.fieldType,
                pattern: entityField.pattern,
              })
            ) {
              isFormValid = false;
              break;
            }
          }

          form.append(key, value);
        }
      }

      if (!isFormValid) {
        setError('Form has validation errors');
        return null;
      }

      if (Object.keys(files).length > 0) {
        const isValidFile = validateFilesClient(files, () => setError('Wrong file format'));
        if (!isValidFile) {
          return null;
        }
        for (const [key, value] of Object.entries(files)) {
          form.append(key, value.accept);
          value.data.forEach((file) => {
            if (!form.has(key)) {
              form.append(key, file, file.name);
            }
          });
        }
      }

      if (captchaToken) {
        form.append('captchaToken', captchaToken);
      }

      await axios
        .post(`/api/forms/${entity.slug}`, form, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        .then((response) => {
          logger.log(response.statusText, LoggerLevel.debug);
          setTimeout(() => {
            setIsSuccess(false);
          }, 3000);
          setIsSuccess(true);
          setIsLoading(false);
          setCaptchaToken('');
          // recaptcha?.current?.reset();
          refForm?.current?.reset();
        })
        .catch((error) => {
          setError(error.message);
          logger.log(error, LoggerLevel.error);
        });
    } catch (error) {
      let message = 'Unable to send data, try again later';
      if (error instanceof Error) message = error.message;
      setError(message);
      logger.log(message, LoggerLevel.error);
    } finally {
      setIsValidating(false);
      setIsLoading(false);
    }
  }

  return (
    <form
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className={`form relative lg:gap-2 py-1 ${className ?? ''} ${isValidating ? '-validating' : ''}`}
      ref={refForm}
    >
      <Markdown
        classNames={'mb-6'}
        markdownText={formData?.description ?? ''}
      ></Markdown>
      <div className="form__field">{formFields}</div>
      {siteKey && (
        <div className="pt-4">
          <ReCAPTCHA
            size="normal"
            sitekey={siteKey}
            onChange={onCaptchaChange}
            ref={recaptcha}
          />
        </div>
      )}
      {error && (
        <AlertMessage
          title="common-error"
          subtitle={error}
          className="mt-4"
        />
      )}
      <div className="relative">
        <SubmitButton
          buttonLabel={formData?.submitActionLabel}
          isLoading={isLoading}
          isDisabled={isLoading || (!captchaToken && !!siteKey)}
          onclick={handleValidation}
        />
        {isSuccess && (
          <Toast
            type="success"
            title="form-success"
          />
        )}
      </div>
    </form>
  );
};

export default FormView;
