import { MenuItem } from '@/models/types/menu';

/**
 * Set active menu given a page path
 * @param menuItems a MenuItem[] array
 * @param pagePath a string containing the current path URL
 * @returns MenuItem[] array with `isActive` property in case of pattern match
 * @example Given a URL like `/pages/about`, both menu items pointing to `/pages/` and `/pages/about` are active
 **/
export const setActiveMenuItem = (menuItems: MenuItem[], pagePath: string): MenuItem[] => {
  highlightMenuItems(menuItems, pagePath);
  return menuItems;
};

const findActiveMenuItem = (menuItems: MenuItem[], pagePath: string): MenuItem | undefined => {
  for (const item of menuItems) {
    if (item.link && item.link === pagePath) {
      item.isActive = true;
      return item;
    }
    if (item.items.length > 0) {
      const nestedItem = findActiveMenuItem(item.items, pagePath);
      if (nestedItem) {
        nestedItem.isActive = true;
        return nestedItem;
      }
    }
  }
  return undefined;
};

const highlightMenuItems = (menuItems: MenuItem[], pagePath: string): void => {
  const pathSegments = pagePath.split('/').filter(Boolean);
  if (!pathSegments) {
    return;
  }

  const activeMenuItem = findActiveMenuItem(menuItems, pagePath);

  menuItems.forEach((item) => {
    // Exclude the possible active item already selected
    // And if the active item link is longer then the current item
    if (!item.link || item.link === activeMenuItem?.link) {
      return;
    }

    const itemPath = item.link.split('/').filter(Boolean);
    if (!itemPath) {
      return;
    }

    // Check if all segments of the closest item's path match the pagePath
    const isMatch = itemPath.every((segment, index) => segment === pathSegments[index]);

    if (isMatch) {
      item.isActive = true;
      let activeChildren = undefined;
      if (item.items.length !== 0) {
        // Try to mark as active its children
        activeChildren = findActiveMenuItem(item.items, pagePath);
      }
      // If there is already n active menu item, if none of the nested children is active
      // the menu item must be reset to inactive
      //
      // @ts-ignore
      if (!activeChildren && activeMenuItem?.link?.length > item.link.length) {
        item.isActive = false;
      }
    }
  });
};
