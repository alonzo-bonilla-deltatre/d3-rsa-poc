import { Metadata } from 'next';
import { generatePageMetadata } from '@/app/pageHelpers';
import { ReturnComponentRender } from '@/models/types/components';
import { renderPage } from '@/services/renderHandlers/renderPage';

export default async function Page({
  params,
}: {
  params: { pageName: string[]; q?: string; token?: string; appView?: string };
}): Promise<ReturnComponentRender> {
  return await renderPage(params);
}

export async function generateMetadata({ params }: { params: { pageName: string[] } }): Promise<Metadata> {
  return await generatePageMetadata(params);
}
