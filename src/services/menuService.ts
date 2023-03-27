import { MenuItem, MenuResponse, MenuResponseData } from "@/models/types/menu";
import { footerMenu } from "@/pages/api/__mocks__/footerMenu"
import { headerServiceMenu } from "@/pages/api/__mocks__/headerServiceMenu"

export const getFooterMenu = (): MenuResponseData => {

  const result = footerMenu as MenuResponse;
  return result.data;
};

export const getHeaderServiceMenu = (): MenuResponseData => {

  const result = headerServiceMenu as MenuResponse;
  return result.data;
};

export const getMenu = (name: string): MenuResponseData | [] => {
  switch (name) {
    case "footerMenu":
      return getFooterMenu();
    case "headerServiceMenu":
      return getHeaderServiceMenu();
    default:
      return [];
  }
};

export const setValidItems = (items: MenuItem[], pagePath: string): object[] => {
  let validMenuItems: object[] = [];
  items.forEach((item) => {
    let menuItemLink = item.properties.link;
    if (menuItemLink.endsWith("/")) {
      menuItemLink += "index"
    }
    const itemLinkParts = menuItemLink.split("/");
    const pagePathParts = pagePath.split("/");
    const itemLinkPartsLength = itemLinkParts.length;
    const pagePathPartsLength = pagePathParts.length;
    const indexCount = pagePathPartsLength > itemLinkPartsLength ? itemLinkPartsLength : pagePathPartsLength;
    for (var i = 1; i < indexCount; i++) {
      if (pagePathParts[i] !== itemLinkParts[i]) {
        break;
      }
  
      validMenuItems.push({
        key: item,
        value: 1//validMenuItems[item!] + 1
      });//      [menuitem] = validMenuItems[item] + 1;
    }
    // if (item.menuItems.length > 0) {
    //   validMenuItems = validMenuItems.Concat(setValidItems(menuitem.MenuItems, baseUrlVariable)).ToDictionary(item => item.Key, item => item.Value);
    // }
  });


  return validMenuItems;
};