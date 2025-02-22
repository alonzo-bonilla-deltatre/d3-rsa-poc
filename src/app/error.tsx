'use client';

import useTranslate from '@/hooks/useTranslate';
import Link from '@/components/commons/Link/Link';
import Typography from '@/components/commons/Typography/Typography';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const translate = useTranslate();
  return (
    <section className="m-0 flex h-screen overflow-hidden p-0">
      <div className="m-auto">
        <Typography
          variant="h2"
          className="mb-6"
        >
          {translate('500-error')}
        </Typography>
        <Typography
          variant="h3"
          className="mb-12"
        >
          {translate('500-oops-error')}
        </Typography>
        <Typography
          variant="body-m"
          className="mb-12"
        >
          {translate('500-error-message')}
        </Typography>
        <nav>
          <ul className="flex list-none space-x-5">
            <li>
              <Link
                href="/"
                title={translate('back-to-homepage')}
                className="uppercase transition duration-300 hover:text-link"
              >
                <Typography variant="navigation-l">{translate('back-to-homepage')}</Typography>
              </Link>
            </li>
            <li>
              <button
                className="uppercase transition duration-300 hover:text-link"
                onClick={() => reset()}
              >
                <Typography variant="navigation-l">{translate('try-again')}</Typography>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
