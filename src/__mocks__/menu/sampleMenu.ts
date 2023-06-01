//https://forge.integrations-lab-forge.deltatre.digital/deltatre.forge.vsm/api/menus/475183FD-CEBE-4C56-90E9-28895782CC29

import { MenuStructureResponse } from '@/models/types/menu';

const sampleMenu: MenuStructureResponse = {
  data: {
    variables: [],
    items: [
      {
        id: '04e0423e-3da2-4c9c-88b9-a4d29089b329',
        text: 'home',
        tag: 'home',
        link: '',
        target: '',
        tooltip: '',
        visible: true,
        icon: {
          data: '',
        },
        properties: {
          data: '',
        },
        items: [],
      },
      {
        id: '04e0423e-3da2-4c9c-7777-a4d29089b329',
        text: 'news',
        tag: 'news',
        link: '',
        target: '',
        tooltip: '',
        visible: true,
        icon: {
          data: '',
        },
        properties: {
          data: '',
        },
        items: [],
      },
      {
        id: '04e0423e-3da2-4c9c-4444-a4d29089b329',
        text: 'about-us',
        tag: 'about-us',
        link: '',
        target: '',
        tooltip: '',
        visible: true,
        icon: {
          data: '',
        },
        properties: {
          data: '',
        },
        items: [],
      },
      {
        id: '13012066-b02f-4213-b00e-691804f438fc',
        text: 'Contact',
        tag: 'contact',
        link: 'link',
        target: 'target',
        tooltip: 'tooltip',
        visible: true,
        icon: {
          data: '',
        },
        properties: {
          data: 'custom-prop',
        },
        items: [],
      },
    ],
    name: '_sample-menu',
    path: '~/_sample-menu',
  },
  meta: {
    version: '1.0',
  },
};

export { sampleMenu };
