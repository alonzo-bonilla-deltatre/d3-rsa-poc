const sampleTwoColumns = {
  key: {
    id: 'TwoColumns',
    namespace: 'd3-external',
  },
  type: 'layout',
  properties: {},
  slot: 'main',
  slots: ['leftContent', 'rightContent'],
  items: [
    {
      key: {
        id: 'HtmlContent',
        namespace: 'd3-external',
      },
      type: 'module',
      properties: {
        content:
          '<div class="inline-block text-white bg-accent font-bold uppercase px-8 py-6 outline-none">     <p class="text-neutral-50">HTML block 2nd</p>   </div>',
      },
      slot: 'rightContent',
    },
    {
      key: {
        id: 'HtmlContent',
        namespace: 'd3-external',
      },
      type: 'module',
      properties: {
        content:
          '<div class="inline-block text-white bg-accent font-bold uppercase px-8 py-6 outline-none">     <p class="text-neutral-50">HTML block</p>   </div>',
      },
      slot: 'leftContent',
    },
  ],
};

export { sampleTwoColumns };
