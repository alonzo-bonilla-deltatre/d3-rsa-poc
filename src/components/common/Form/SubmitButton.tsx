'use client';

import useTranslate from '@/hooks/useTranslate';
import CallToAction from '@/components/common/CallToAction/CallToAction';

type FieldProps = {
  buttonLabel?: string;
  isLoading: boolean;
  isDisabled: boolean;
  onclick?: () => void;
};

const SubmitButton = ({ buttonLabel, isLoading, isDisabled, onclick }: FieldProps) => {
  const translate = useTranslate();

  return (
    <div className="form__field">
      <CallToAction
        buttonType="submit"
        style={isDisabled ? 'disabled' : 'primary'}
        isDisabled={isDisabled}
        onClick={onclick}
        text={isLoading ? translate('loading') : buttonLabel ?? 'submit'}
      />
    </div>
  );
};

export default SubmitButton;
