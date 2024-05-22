import styles from '@/components/commons/CallToActionButton/CallToActionButton.module.scss';
import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import Loader from '@/components/commons/Loader/Loader';

export enum CallToActionButtonTypes {
  filled = 'filled',
  outlined = 'outlined',
}

type CallToActionProps = {
  text: string;
  onClick: () => void;
  buttonType?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: CallToActionButtonTypes;
};

const CallToActionLink = ({
  text,
  onClick,
  buttonType = 'button',
  isLoading = false,
  isDisabled = false,
  type = CallToActionButtonTypes.filled,
}: CallToActionProps) => {
  return (
    <button
      onClick={onClick}
      type={buttonType || 'button'}
      className={type ? styles[type] : ''}
      disabled={isDisabled}
    >
      {isLoading && <Loader />}
      <Typography variant={'cta-m'}>
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </button>
  );
};

export default CallToActionLink;
