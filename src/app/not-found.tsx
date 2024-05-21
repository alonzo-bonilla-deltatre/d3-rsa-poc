import { translate } from '@/helpers/translationHelper';
import Link from '@/components/commons/Link/Link';
import Typography from '@/components/commons/Typography/Typography';

export default function NotFound() {
  return (
    <section className="flex h-screen overflow-hidden m-0 p-0">
      <div className="m-auto">
        <Typography variant={'h2'} className="mb-6">{translate('404-error')}</Typography>
        <Typography variant={'h3'} className="mb-6">{translate('404-oops-error')}</Typography>
        <Typography variant={'body-m'} className="mb-12">{translate('404-error-message')}</Typography>
        <Link
          href={'/'}
          title={translate('back-to-homepage')}
          className={'uppercase transition duration-300 hover:text-link'}
        >
          <Typography variant={'navigation-m'}>{translate('back-to-homepage')}</Typography>
        </Link>
      </div>
    </section>
  );
}
