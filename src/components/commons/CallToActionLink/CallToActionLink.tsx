import Link from '@/components/commons/Link/Link';
import styles from '@/components/commons/CallToActionLink/CallToActionLink.module.scss';
import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

export enum CallToActionLinkTypes {
  filled = 'filled',
  outlined = 'outlined',
}

type CallToActionProps = {
  url: string;
  text: string;
  baseUrl?: string;
  type?: CallToActionLinkTypes;
};

const CallToActionLink = ({ url, text, baseUrl, type = CallToActionLinkTypes.filled }: CallToActionProps) => {
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
