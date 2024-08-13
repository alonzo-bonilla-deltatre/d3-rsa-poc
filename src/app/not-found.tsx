'use client';

import Link from 'next/link';
import useTranslate from '@/hooks/useTranslate';
import Typography from '@/components/commons/Typography/Typography';

export default function NotFound() {
  const translate = useTranslate();
  return (
    <section className="flex h-screen overflow-hidden m-0 p-0">
      <div className="m-auto">
        <Typography
          variant={'h2'}
          className="mb-6"
        >
          {translate('404-error')}
        </Typography>
        <Typography
          variant={'h3'}
          className="mb-6"
        >
          {translate('404-oops-error')}
        </Typography>
        <Typography
          variant={'body-m'}
          className="mb-12"
        >
          {translate('404-error-message')}
        </Typography>
        <Link
          href={'/'}
          title={translate('back-to-homepage')}
          className={'uppercase transition duration-300 hover:text-link'}
        >
          <Typography variant={'navigation-l'}>{translate('back-to-homepage')}</Typography>
        </Link>
      </div>
    </section>
  );
}
