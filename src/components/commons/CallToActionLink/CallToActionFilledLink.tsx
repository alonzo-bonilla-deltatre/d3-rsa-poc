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
      className="relative inset-0 inline-flex cursor-pointer items-center gap-2 rounded-full border border-current px-5 py-2 uppercase text-current transition duration-300 hover:text-link"
    >
      <Typography variant="cta-m">
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </Link>
  );
};

export default CallToActionFilledLink;
