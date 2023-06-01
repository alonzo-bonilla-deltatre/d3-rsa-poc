//https://forge.integrations-lab-forge.deltatre.digital/deltatre.forge.vsm/api/menus/D4B968B9-E094-45FB-ADED-9C6DC90E4946
import { MenuStructureResponse } from '@/models/types/menu';

const headerServiceMenu: MenuStructureResponse = {
  data: {
    variables: [],
    items: [
      {
        id: '9f9ba3fc-3438-4794-8200-480a5c0a06a3',
        text: 'Tickets',
        tag: 'tickets',
        link: '/tickets',
        target: '',
        tooltip: '',
        visible: true,
        icon: {
          data: '/icons/header_ticket.svg',
        },
        properties: {
          data: '',
        },
        items: [],
      },
      {
        id: '241bf525-1f42-42b5-ae40-561b466ac3eb',
        text: 'Shop',
        tag: 'shop',
        link: '/shop',
        target: '_blank',
        tooltip: '',
        visible: true,
        icon: {
          data: '/icons/header_shop.svg',
        },
        properties: {
          data: '',
        },
        items: [],
      },
      {
        id: '78248d03-72d8-459c-bec3-a83f841a75d1',
        text: 'Search',
        tag: 'search',
        link: '/search',
        target: '',
        tooltip: '',
        visible: true,
        icon: {
          data: '/icons/header_search.svg',
        },
        properties: {
          data: '',
        },
        items: [],
      },
      {
        id: '7dad6f8d-deba-4cf5-9d82-0ba72b20d891',
        text: 'Login',
        tag: 'login',
        link: '/user',
        target: '',
        tooltip: '',
        visible: true,
        icon: {
          data: '/icons/header_login.svg',
        },
        properties: {
          data: '',
        },
        items: [],
      },
    ],
    name: '_header-services',
    path: '~/_header-services',
  },
  meta: {
    version: '1.0',
  },
};

export { headerServiceMenu };
