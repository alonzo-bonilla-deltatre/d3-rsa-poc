import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import Loader from '@/components/commons/Loader/Loader';

type CallToActionFilledButtonProps = {
  text: string;
  onClick: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
};

const CallToActionFilledButton = ({
  text,
  onClick,
  buttonType = 'button',
  isLoading = false,
  isDisabled = false,
}: CallToActionFilledButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={buttonType || 'button'}
      className="relative inset-0 inline-flex cursor-pointer items-center gap-2 rounded-full border border-current px-5 py-2 uppercase text-current transition duration-300 hover:text-link"
      disabled={isDisabled}
    >
      {isLoading && <Loader />}
      <Typography variant="cta-m">
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </button>
  );
};

export default CallToActionFilledButton;
