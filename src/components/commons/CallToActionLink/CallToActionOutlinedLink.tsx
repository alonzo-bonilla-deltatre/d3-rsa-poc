import Link from '@/components/commons/Link/Link';
import Typography from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';

type CallToActionOutlinedLinkProps = {
  url: string;
  text: string;
  baseUrl?: string;
};

const CallToActionOutlinedLink = ({ url, text, baseUrl }: CallToActionOutlinedLinkProps) => {
  return (
    <Link
      href={url}
      baseUrl={baseUrl}
      className={
        "uppercase text-current relative py-2 inset-0 rounded-full cursor-pointer hover:text-link transition duration-300 after:block after:content-[''] after:absolute after:border after:border-link after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
      }
    >
      <Typography variant="cta-m">
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </Link>
  );
};

export default CallToActionOutlinedLink;
