import { MenuItem } from '@/models/types/menu';
import { setActiveMenuItem } from './menuHelpers';

describe('setActiveMenuItem', () => {
  test('should set the isActive property of the matching menu item to true', () => {
    // ARRANGE
    const menuItems: MenuItem[] = [
      {
        id: '1',
        text: 'Home',
        tag: 'home',
        link: '/home',
        target: '_self',
        tooltip: 'Go to Home',
        visible: true,
        icon: { data: 'home' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
      {
        id: '2',
        text: 'About',
        tag: 'about',
        link: '/about',
        target: '_self',
        tooltip: 'Go to About',
        visible: true,
        icon: { data: 'about' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
    ];
    const pagePath = '/about';

    // ACT
    const result = setActiveMenuItem(menuItems, pagePath);

    // ASSERT
    expect(result[0].isActive).toBe(false);
    expect(result[1].isActive).toBe(true);
  });

  test('should set the isActive property on items that are sharing the second-last segment ', () => {
    // ARRANGE
    const menuItems: MenuItem[] = [
      {
        id: '1',
        text: 'Home',
        tag: 'home',
        link: '/home',
        target: '_self',
        tooltip: 'Go to Home',
        visible: true,
        icon: { data: 'home' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
      {
        id: '2',
        text: 'News',
        tag: 'news',
        link: '/news/',
        target: '_self',
        tooltip: 'Go to News',
        visible: true,
        icon: { data: 'news' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
      {
        id: '3',
        text: 'Latest News',
        tag: 'news',
        link: '/news/latest',
        target: '_self',
        tooltip: 'Go to Latest News',
        visible: true,
        icon: { data: 'latest' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
    ];
    const pagePath = '/news/article-1';

    // ACT
    const result = setActiveMenuItem(menuItems, pagePath);

    // ASSERT
    expect(result[0].isActive).toBe(false);
    expect(result[1].isActive).toBe(true); // `/news/` is active too
    expect(result[2].isActive).toBe(false);
  });

  test('should not set the isActive property on not nested items that are sharing the same path', () => {
    // ARRANGE
    const menuItems: MenuItem[] = [
      {
        id: '1',
        text: 'About',
        tag: 'about',
        link: '/about/',
        target: '_self',
        tooltip: 'Go to About',
        visible: true,
        icon: { data: 'about' },
        properties: { data: '' },
        isActive: false,
        items: [],
      },
      {
        id: '1_2',
        text: 'Contact',
        tag: 'contact',
        link: '/about/contact',
        target: '_self',
        tooltip: 'Go to contact',
        visible: true,
        icon: { data: 'contact' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
    ];
    const pagePath = '/about/contact';

    // ACT
    const result = setActiveMenuItem(menuItems, pagePath);

    // ASSERT
    expect(result[0].isActive).toBe(false);
    expect(result[1].isActive).toBe(true);
  });

  test('should set the isActive property on the parent when a child is active', () => {
    // ARRANGE
    const menuItems: MenuItem[] = [
      {
        id: '1',
        text: 'About',
        tag: 'about',
        link: '/about/',
        target: '_self',
        tooltip: 'Go to About',
        visible: true,
        icon: { data: 'about' },
        properties: { data: '' },
        isActive: false,
        items: [
          {
            id: '1_1',
            text: 'Company',
            tag: 'company',
            link: '/about/company',
            target: '_self',
            tooltip: 'Go to Company',
            visible: true,
            icon: { data: 'company' },
            properties: { data: '' },
            items: [],
            isActive: false,
          },
          {
            id: '1_2',
            text: 'Contact',
            tag: 'contact',
            link: '/about/contact',
            target: '_self',
            tooltip: 'Go to contact',
            visible: true,
            icon: { data: 'contact' },
            properties: { data: '' },
            items: [],
            isActive: false,
          },
        ],
      },
    ];
    const pagePath = '/about/company';

    // ACT
    const result = setActiveMenuItem(menuItems, pagePath);

    // ASSERT
    expect(result[0].isActive).toBe(true); // parent is active too
    expect(result[0].items[0].isActive).toBe(true); // first item active
    expect(result[0].items[1].isActive).toBe(false); // second item not active
  });

  test('should return the original menu items if no matching item is found', () => {
    // ARRANGE
    const menuItems: MenuItem[] = [
      {
        id: '1',
        text: 'Home',
        tag: 'home',
        link: '/home',
        target: '_self',
        tooltip: 'Go to Home',
        visible: true,
        icon: { data: 'home' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
      {
        id: '2',
        text: 'About',
        tag: 'about',
        link: '/about',
        target: '_self',
        tooltip: 'Go to About',
        visible: true,
        icon: { data: 'about' },
        properties: { data: '' },
        items: [],
        isActive: false,
      },
    ];
    const pagePath = '/services';

    // ACT
    const result = setActiveMenuItem(menuItems, pagePath);

    // ASSERT
    expect(result).toEqual(menuItems);
  });
});
