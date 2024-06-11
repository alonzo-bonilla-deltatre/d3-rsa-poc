import { Metadata } from 'next';
import { generatePageMetadata } from '@/helpers/pageHelper';
import { ReturnComponentRender } from '@/models/types/components';
import { renderPage } from '@/services/renderHandlers/renderPage';
import { notFound } from 'next/navigation';

/* SSG revalidate time */
export const revalidate = 60;

/* SSG process */
export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: { pageName: string[]; q?: string; token?: string; appView?: string };
}): Promise<ReturnComponentRender> {
  const page = await renderPage(params);
  if (page) {
    return page;
  } else {
    return notFound();
  }
}

export async function generateMetadata({ params }: { params: { pageName: string[] } }): Promise<Metadata> {
  return await generatePageMetadata(params);
}
