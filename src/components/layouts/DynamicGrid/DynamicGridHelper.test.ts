import { getGridChildrenCssClasses, getGridContainerCssClasses } from './DynamicGridHelper';

describe('getGridContainerCssClasses', () => {
  it('should return "grid grid-cols-1" if "undefined" is passed', () => {
    const layout = getGridContainerCssClasses(undefined); // NOSONAR
    expect(layout).toStrictEqual('grid grid-cols-1 lg:grid-cols-2 gap-4');
  });

  it('should return "grid grid-cols-1 lg:grid-cols-2 gap-4" if "6-6" is passed', () => {
    const layout = getGridContainerCssClasses('6-6');
    expect(layout).toStrictEqual('grid grid-cols-1 lg:grid-cols-2 gap-4');
  });

  it('should return "grid grid-cols-1 lg:grid-cols-3 gap-4" if "4-4-4" is passed', () => {
    const layout = getGridContainerCssClasses('4-4-4');
    expect(layout).toStrictEqual('grid grid-cols-1 lg:grid-cols-3 gap-4');
  });

  it('should return "grid grid-cols-1 lg:grid-cols-4 gap-4" if "9-3" is passed', () => {
    const layout = getGridContainerCssClasses('9-3');
    expect(layout).toStrictEqual('grid grid-cols-1 lg:grid-cols-4 gap-4');
  });

  it('should return "grid grid-cols-1 lg:grid-cols-4 gap-4" if "3-6-3" is passed', () => {
    const layout = getGridContainerCssClasses('3-6-3');
    expect(layout).toStrictEqual('grid grid-cols-1 lg:grid-cols-4 gap-4');
  });

  it('should return "grid grid-cols-1 lg:grid-cols-4 gap-4" if "3-3-3-3" is passed', () => {
    const layout = getGridContainerCssClasses('3-3-3-3');
    expect(layout).toStrictEqual('grid grid-cols-1 lg:grid-cols-4 gap-4');
  });
});

describe('getGridContainerCssClasses', () => {
  it('should return "col-span-2" if "3-6-3" is passed', () => {
    const layout = getGridChildrenCssClasses('3-6-3');
    expect(layout).toEqual(['', ' col-span-2 ', '']);
  });

  it('should return "col-span-3" if "3-9" is passed', () => {
    const layout = getGridChildrenCssClasses('3-9');
    expect(layout).toEqual(['', ' col-span-3 ']);
  });

  it('should return "col-span-3" if "9-3" is passed', () => {
    const layout = getGridChildrenCssClasses('9-3');
    expect(layout).toEqual([' col-span-3 ', '']);
  });

  it('should return "col-span-1" if empty string is passed', () => {
    const layout = getGridChildrenCssClasses('xxxxxxx');
    expect(layout).toEqual([' col-span-1 ']);
  });

  it('should return "col-span-1" if any other string is passed', () => {
    const layout = getGridChildrenCssClasses('xxxxxxx');
    expect(layout).toEqual([' col-span-1 ']);
  });
});
