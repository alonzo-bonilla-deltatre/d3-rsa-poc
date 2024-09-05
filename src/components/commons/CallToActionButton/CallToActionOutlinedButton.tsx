import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import Loader from '@/components/commons/Loader/Loader';

type CallToActionOutlinedButtonProps = {
  text: string;
  onClick: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
};

const CallToActionOutlinedButton = ({
  text,
  onClick,
  buttonType = 'button',
  isLoading = false,
  isDisabled = false,
}: CallToActionOutlinedButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={buttonType || 'button'}
      className={
        "relative inset-0 cursor-pointer rounded-full py-2 uppercase text-current transition duration-300 after:absolute after:block after:w-full after:origin-center after:scale-x-0 after:border after:border-link after:transition after:duration-300 after:content-[''] hover:text-link after:hover:scale-x-100"
      }
      disabled={isDisabled}
    >
      {isLoading && <Loader />}
      <Typography variant="cta-m">
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </button>
  );
};

export default CallToActionOutlinedButton;
