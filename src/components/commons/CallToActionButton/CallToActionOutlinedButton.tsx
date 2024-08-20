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
        "uppercase text-current relative py-2 inset-0 rounded-full cursor-pointer hover:text-link transition duration-300 after:block after:content-[''] after:absolute after:border after:border-link after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
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
