import { getGridChildrenCssClasses } from '@/components/layouts/DynamicGrid/DynamicGridHelper';

describe('getGridChildrenCssClasses', () => {
  it('should return the expected array', () => {
    expect(getGridChildrenCssClasses('3-3-3-3')).toEqual([
      'lg:col-span-3',
      'lg:col-span-3',
      'lg:col-span-3',
      'lg:col-span-3',
    ]);

    expect(getGridChildrenCssClasses('3-6-3')).toEqual(['lg:col-span-3', 'lg:col-span-6', 'lg:col-span-3']);

    expect(getGridChildrenCssClasses('2-8-2')).toEqual(['lg:col-span-2', 'lg:col-span-8', 'lg:col-span-2']);

    expect(getGridChildrenCssClasses('6-6')).toEqual(['lg:col-span-6', 'lg:col-span-6']);

    expect(getGridChildrenCssClasses('4-4-4')).toEqual(['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4']);

    expect(getGridChildrenCssClasses('3-9')).toEqual(['lg:col-span-3', 'lg:col-span-9']);

    expect(getGridChildrenCssClasses('9-3')).toEqual(['lg:col-span-9', 'lg:col-span-3']);

    expect(getGridChildrenCssClasses('')).toEqual(['lg:col-span-12']);

    expect(getGridChildrenCssClasses('xxxxxxx')).toEqual(['lg:col-span-12']);
  });
});
