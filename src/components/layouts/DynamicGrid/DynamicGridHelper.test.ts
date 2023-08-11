import { getGridChildrenCssClasses, getGridContainerCssClasses } from './DynamicGridHelper';

describe('getGridContainerCssClasses', () => {
  it('should return the right classes', () => {
    expect(getGridContainerCssClasses()).toStrictEqual('grid grid-cols-1 lg:grid-cols-2');

    expect(getGridContainerCssClasses('6-6')).toStrictEqual('grid grid-cols-1 lg:grid-cols-2');

    expect(getGridContainerCssClasses('4-4-4')).toStrictEqual('grid grid-cols-1 lg:grid-cols-3');

    expect(getGridContainerCssClasses('9-3')).toStrictEqual('grid grid-cols-1 lg:grid-cols-4');

    expect(getGridContainerCssClasses('3-6-3')).toStrictEqual('grid grid-cols-1 lg:grid-cols-4');

    expect(getGridContainerCssClasses('3-3-3-3')).toStrictEqual('grid grid-cols-1 lg:grid-cols-4');
  });
});

describe('getGridContainerCssClasses', () => {
  it('should return the expected array', () => {
    expect(getGridChildrenCssClasses('3-6-3')).toEqual(['', ' col-span-2 ', '']);

    expect(getGridChildrenCssClasses('3-9')).toEqual(['', ' col-span-3 ']);

    expect(getGridChildrenCssClasses('9-3')).toEqual([' col-span-3 ', '']);

    expect(getGridChildrenCssClasses('')).toEqual([' col-span-1 ']);

    expect(getGridChildrenCssClasses('xxxxxxx')).toEqual([' col-span-1 ']);
  });
});
