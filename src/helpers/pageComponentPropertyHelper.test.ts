import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';

describe('getBooleanProperty function', () => {
  it('should return false if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getBooleanProperty(propertyValue);
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set true', () => {
    const propertyValue = true;
    const result = getBooleanProperty(propertyValue);
    expect(result).toEqual(true);
  });

  it('should return false if propertyValue is set false', () => {
    const propertyValue = false;
    const result = getBooleanProperty(propertyValue);
    expect(result).toEqual(false);
  });
});

describe('getNumberProperty function', () => {
  it('should return defaultValue if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getNumberProperty(propertyValue);
    expect(result).toEqual(0);
  });

  it('should return different defaultValue if propertyValue is undefined and defaultValue is set', () => {
    const propertyValue = undefined;
    const defaultValue = 5;
    const result = getNumberProperty(propertyValue, defaultValue);
    expect(result).toEqual(5);
  });

  it('should return true if propertyValue is set true', () => {
    const propertyValue = 1;
    const result = getNumberProperty(propertyValue);
    expect(result).toEqual(1);
  });

  it('should return false if propertyValue is set false', () => {
    const propertyValue = -1;
    const result = getNumberProperty(propertyValue);
    expect(result).toEqual(-1);
  });
});
