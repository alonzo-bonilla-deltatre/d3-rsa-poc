import Link from '@/components/commons/Link/Link';
import styles from '@/components/commons/CallToActionLink/CallToActionLink.module.scss';
import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

export enum CallToActionTypes {
  filled = 'filled',
  outlined = 'outlined',
}

type CallToActionProps = {
  url: string;
  text: string;
  baseUrl?: string;
  type?: CallToActionTypes;
};

const CallToActionLink = ({
                            url,
                            text,
                            baseUrl,
                            type = CallToActionTypes.filled,
                          }: CallToActionProps) => {
  return (
    <Link
      href={url}
      baseUrl={baseUrl}
      className={type ? styles[type] : ''}
    >
      <Typography variant={'cta-m'}>
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </Link>
  );
};

export default CallToActionLink;