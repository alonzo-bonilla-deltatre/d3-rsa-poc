const indexStructure = {
  data: {
    structure: {
      key: {
        id: 'default',
        namespace: 'urn:forgegosandbox',
      },
      type: 'template',
      properties: {},
      slots: ['main'],
      items: [
        {
          key: {
            id: 'Promo',
            namespace: 'urn:online-common',
          },
          type: 'module',
          properties: {
            title : "Promo module title"
          },
          slot: 'main',
        },
        {
          key: {
            id: "Section",
            namespace: "urn:online-common-xrc"
          },
          type: "layout",
          properties: {
            templates: "4",
            sectionTitle: "TITLE SECTION"
          },
          slot: "main",
          slots: ["item"],
          items: [
            {
          
              key: {
                id: 'Brightcove',
                namespace: 'urn:online-common',
              },
              type: 'module',
              properties: {
                title : "Brightcove first module title"
              },
              slot: 'item',
            },
            {
          
              key: {
                id: 'Brightcove',
                namespace: 'urn:online-common',
              },
              type: 'module',
              properties: {
                title : "Brightcove second module title"
              },
              slot: 'item',
            }
          ]
        }
      ]
    },
    variables: [
      {
        type: 'keyValue',
        key: 'ishomepage',
        keyValue: {
          value: 'True',
          valueType: 'boolean',
        },
      },
      {
        type: 'keyValue',
        key: 'testali',
        keyValue: {
          value: 'helloworld',
          valueType: 'string',
        },
      },
    ],
    metadata: [
      {
        category: "seo",
        key: "title",
        value: "Deltatre Frontend Rendering Engine",
        type: "string"      
      },
      {
        category: "seo",
        key: "description",
        value: "POC for the new frontend rendering engine",
        type: "string"      
      }
    ]
  },
  meta: {
    version: '1.0',
  },
};


export { indexStructure };
