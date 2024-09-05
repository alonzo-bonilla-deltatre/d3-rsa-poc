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
        "relative inset-0 cursor-pointer rounded-full py-2 uppercase text-current transition duration-300 after:absolute after:block after:w-full after:origin-center after:scale-x-0 after:border after:border-link after:transition after:duration-300 after:content-[''] hover:text-link after:hover:scale-x-100"
      }
    >
      <Typography variant="cta-m">
        <TranslatedLabel translationTermKey={text} />
      </Typography>
    </Link>
  );
};

export default CallToActionOutlinedLink;
