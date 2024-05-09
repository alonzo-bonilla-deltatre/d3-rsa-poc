import { MenuStructureResponse } from '@/models/types/menu';

const testMenu: MenuStructureResponse = {
  data: {
    variables: [],
    items: [
      {
        id: 'test-id-1',
        text: 'Test',
        tag: 'test',
        link: 'test-link',
        target: 'test-target',
        tooltip: 'test-tooltip',
        visible: true,
        icon: {
          data: 'test-data',
        },
        properties: {
          data: 'test-custom-prop',
        },
        items: [],
      },
      {
        id: 'test-id-2',
        text: 'Test-2',
        tag: 'test-2',
        link: 'test-link-2',
        target: 'test-target-2',
        tooltip: 'test-tooltip-2',
        visible: true,
        icon: {
          data: 'test-data-2',
        },
        properties: {
          data: 'test-custom-prop-2',
        },
        items: [],
      },
      {
        id: 'test-id-3',
        text: 'Test-3',
        tag: 'test-3',
        link: 'test-link-3',
        target: 'test-target-3',
        tooltip: 'test-tooltip-3',
        visible: true,
        icon: {
          data: 'test-data-3',
        },
        properties: {
          data: 'test-custom-prop-3',
        },
        items: [],
      },
      {
        id: 'test-id-4',
        text: 'Test-4',
        tag: 'test-4',
        link: 'test-link-4',
        target: 'test-target-4',
        tooltip: 'test-tooltip-4',
        visible: true,
        icon: {
          data: 'test-data-4',
        },
        properties: {
          data: 'test-custom-prop-4',
        },
        items: [],
      },
    ],
    name: 'test-menu',
    path: '~/_test-menu',
  },
  meta: {
    version: '1.0',
  },
};

export { testMenu };
