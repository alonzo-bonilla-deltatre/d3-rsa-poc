//https://forge.integrations-lab-forge.deltatre.digital/deltatre.forge.vsm/api/menus/475183FD-CEBE-4C56-90E9-28895782CC29

const sampleMenuWithIcons = {
  data: {
    variables: [],
    menuItems: [
      {
        id: "04e0423e-3da2-4c9c-88b9-a4d29089b329",
        text: "home",
        properties: {
          tag: "home",
          link: "/tickets",
          icon: "/icons/header_ticket.svg"
        },
        menuItems: []
      },
      {
        id: "04e0423e-3da2-4c9c-7777-a4d29089b329",
        text: "news",
        properties: {
          tag: "news",
          link: "/shop",
          icon: "/icons/header_shop.svg",
        },
        menuItems: []
      },
      {
        id: "04e0423e-3da2-4c9c-4444-a4d29089b329",
        text: "about-us",
        properties: {
          tag: "about-us",
          link: "/search",
          icon: "/icons/header_search.svg"
        },
        menuItems: []
      },
      {
        id: "13012066-b02f-4213-b00e-691804f438fc",
        text: "Contact",
        properties: {
          tag: "contact",
          toolTip: "toolTip",
          link: "link",
          target: "target",
          data: "datacontect",
          customproperties: "custom-prop",
          icon: "/icons/header_login.svg"
        },
        menuItems: []
      }
    ],
    id: "475183fd-cebe-4c56-90e9-28895782cc29",
    uriSegmentTranslations: {},
    name: "_sample-menu"
  },
  meta: {
    version: '1.0',
  }
};


export { sampleMenuWithIcons };
