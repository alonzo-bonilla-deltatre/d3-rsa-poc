'use client';
import useTranslate from '@/hooks/useTranslate';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const translate = useTranslate();
  return (
    <section className="flex h-screen overflow-hidden m-0 p-0">
      <div className="m-auto">
        <h1 className="font-bold text-5xl uppercase mb-6">Oops! There was an error</h1>
        <nav
          className="mt-8"
          aria-label={translate('error-navigation')}
        >
          <ul className="list-none flex space-x-5">
            <li>
              <Link
                href={'/'}
                title={'Back to homepage'}
              ></Link>
            </li>
            <li>
              <button
                className="inline-block text-black bg-white font-bold uppercase px-8 py-3 rounded-full outline-none"
                onClick={() => reset()}
              >
                Try again
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
