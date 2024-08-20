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
      className="inline-flex items-center gap-2 uppercase text-current border border-current relative py-2 px-5 inset-0 rounded-full cursor-pointer hover:text-link transition duration-300"
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
