import { MenuItem } from '@/models/types/menu';
import { Variable } from '@/models/types/pageStructure';
import { parseFieldValue } from '@/utilities/fieldValueParserUtility';

/**
 * Sets the `isActive` property of the menu items based on the current page path.
 *
 * This function iterates over each menu item and checks if its link matches the current page path.
 * If a match is found, the `isActive` property of the menu item is set to true.
 * The function then returns the updated menu items.
 *
 * @param {MenuItem[]} menuItems - The menu items to update.
 * @param {string} pagePath - The current page path.
 * @returns {MenuItem[]} The updated menu items.
 *
 * @example Given a URL like `/pages/about`, both menu items pointing to `/pages/` and `/pages/about` are active
 **/
export const setActiveMenuItem = (menuItems: MenuItem[], pagePath: string): MenuItem[] => {
  highlightMenuItems(menuItems, pagePath);
  return menuItems;
};

/**
 * Replaces string templates used in the Menu Item fields with page variables.
 *
 * This function iterates over each menu item and replaces the string templates in its fields with the corresponding page variables.
 * The fields that are updated are `link`, `text`, `tag`, and `tooltip`.
 * If a menu item has sub-items, the function is called recursively to update the sub-items as well.
 * The function then returns the updated menu items.
 *
 * @param {MenuItem[]} menuItems - The menu items to update.
 * @param {Variable[] | undefined} variables - The page variables to use for replacing the string templates.
 * @returns {MenuItem[]} The updated menu items.
 */
export const parseMenuItemFields = (menuItems: MenuItem[], variables: Variable[] | undefined): MenuItem[] => {
  menuItems.forEach((item) => {
    item.link = item.link && parseFieldValue(item.link, variables);
    item.text = item.text && parseFieldValue(item.text, variables);
    item.tag = item.tag && parseFieldValue(item.tag, variables);
    item.tooltip = item.tooltip && parseFieldValue(item.tooltip, variables);

    if (item.items?.length) {
      return parseMenuItemFields(item.items, variables);
    }
  });
  return menuItems;
};

/**
 * Finds the menu item that matches the current page path.
 *
 * This function iterates over each menu item and checks if its link matches the current page path.
 * If a match is found, the `isActive` property of the menu item is set to true and the menu item is returned.
 * If a menu item has sub-items, the function is called recursively to check the sub-items as well.
 * If no match is found, the function returns undefined.
 *
 * @param {MenuItem[]} menuItems - The menu items to check.
 * @param {string} pagePath - The current page path.
 * @returns {MenuItem | undefined} The menu item that matches the current page path, or undefined if no match is found.
 */
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

/**
 * Highlights the menu items that match the current page path.
 *
 * This function splits the current page path into segments and finds the menu item that matches the current page path.
 * It then iterates over each menu item and checks if its link matches all the segments of the current page path.
 * If a match is found, the `isActive` property of the menu item is set to true.
 * If the menu item has sub-items, the function is called recursively to check the sub-items as well.
 *
 * @param {MenuItem[]} menuItems - The menu items to highlight.
 * @param {string} pagePath - The current page path.
 */
const highlightMenuItems = (menuItems: MenuItem[], pagePath: string): void => {
  const pathSegments = pagePath?.split('/').filter(Boolean);
  /* istanbul ignore next */
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

    const itemPath = item.link?.split('/').filter(Boolean);
    /* istanbul ignore next */
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
