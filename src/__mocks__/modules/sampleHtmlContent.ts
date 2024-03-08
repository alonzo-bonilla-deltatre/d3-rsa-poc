import { PageStructureItemType } from '@/models/types/pageStructure';

const sampleHtmlContent = {
  key: {
    id: 'HtmlContent',
    namespace: 'd3-external',
  },
  type: 'module',
  properties: {
    content:
      '<div class="inline-block text-white bg-accent font-bold uppercase px-8 py-6 outline-none">     <p class="text-neutral-50">HTML block 2nd</p>   </div>',
  },
};

const sampleMiddleContent = {
  key: {
    id: 'HtmlContent',
    namespace: 'd3-external',
  },
  type: PageStructureItemType.module,
  properties: {
    content:
      '<div class="inline-block text-white bg-accent uppercase px-8 py-6 outline-none">     <p class="text-neutral-50">Middle content</p>   </div>',
  },
  slot: 'middleContent',
};

export { sampleHtmlContent, sampleMiddleContent };
