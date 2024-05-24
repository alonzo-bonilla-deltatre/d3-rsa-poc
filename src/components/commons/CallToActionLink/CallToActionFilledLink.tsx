import Link from '@/components/commons/Link/Link';
import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

type CallToActionFilledLinkProps = {
  url: string;
  text: string;
  baseUrl?: string;
};

const CallToActionFilledLink = ({ url, text, baseUrl }: CallToActionFilledLinkProps) => {
  return (
    <Link
      href={url}
      baseUrl={baseUrl}
      className={
        'inline-flex items-center gap-2 uppercase text-current border border-current relative py-2 px-5 inset-0 rounded-full cursor-pointer hover:text-link transition duration-300'
      }
    >
      <Typography variant={'cta-m'}>
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </Link>
  );
};

export default CallToActionFilledLink;
