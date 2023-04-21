//https://forge.integrations-lab-forge.deltatre.digital/deltatre.forge.vsm/api/menus/D4B968B9-E094-45FB-ADED-9C6DC90E4946
const headerServiceMenu = {
  data: {
    variables: [],
    menuItems: [
      {
        id: '9f9ba3fc-3438-4794-8200-480a5c0a06a3',
        text: 'Tickets',
        properties: {
          tag: 'tickets',
          link: '/tickets',
          icon: '/icons/header_ticket.svg',
        },
        menuItems: [],
      },
      {
        id: '241bf525-1f42-42b5-ae40-561b466ac3eb',
        text: 'Shop',
        properties: {
          tag: 'shop',
          link: '/shop',
          icon: '/icons/header_shop.svg',
          Target: '_blank',
        },
        menuItems: [],
      },
      {
        id: '78248d03-72d8-459c-bec3-a83f841a75d1',
        text: 'Search',
        properties: {
          tag: 'search',
          link: '/search',
          icon: '/icons/header_search.svg',
        },
        menuItems: [],
      },
      {
        id: '7dad6f8d-deba-4cf5-9d82-0ba72b20d891',
        text: 'Login',
        properties: {
          tag: 'login',
          link: '/user',
          icon: '/icons/header_login.svg',
        },
        menuItems: [],
      },
    ],
    id: 'd4b968b9-e094-45fb-aded-9c6dc90e4946',
    uriSegmentTranslations: {},
    name: '_header-services',
  },
  meta: {
    version: '1.0',
  },
};

export { headerServiceMenu };
