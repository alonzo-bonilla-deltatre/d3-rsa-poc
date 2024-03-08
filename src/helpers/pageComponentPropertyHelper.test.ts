import {
  getBooleanProperty,
  getBooleanPropertyDefault,
  getBooleanPropertyFromString,
  getDarkClass,
  getDarkTheme,
  getHeadingTag,
  getHeadingTagNumber,
  getHideLayout,
  getHideModule,
  getNumberProperty,
  getOppositeBooleanProperty,
  getStringProperty,
} from '@/helpers/pageComponentPropertyHelper';
import { PageStructureItemType } from '@/models/types/pageStructure';

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

describe('getBooleanProperty function', () => {
  it('should return false if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getBooleanPropertyFromString(propertyValue);
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set true', () => {
    const propertyValue = 'True';
    const result = getBooleanPropertyFromString(propertyValue);
    expect(result).toEqual(true);
  });

  it('should return true if propertyValue is set true', () => {
    const propertyValue = 'true';
    const result = getBooleanPropertyFromString(propertyValue);
    expect(result).toEqual(true);
  });

  it('should return false if propertyValue is set false', () => {
    const propertyValue = 'false';
    const result = getBooleanPropertyFromString(propertyValue);
    expect(result).toEqual(false);
  });
});

describe('getBooleanPropertyDefault function', () => {
  it('should return false if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const defaultValue = undefined;
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set true', () => {
    const propertyValue = true;
    const defaultValue = undefined;
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    expect(result).toEqual(propertyValue);
  });

  it('should return false if propertyValue is set false', () => {
    const propertyValue = false;
    const defaultValue = undefined;
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    expect(result).toEqual(propertyValue);
  });

  it('should return true if propertyValue is undefined and defaultValue is set true', () => {
    const propertyValue = undefined;
    const defaultValue = true;
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should return false if propertyValue is undefined and defaultValue is set false', () => {
    const propertyValue = undefined;
    const defaultValue = false;
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    expect(result).toEqual(defaultValue);
  });
});
describe('getOppositeBooleanProperty function', () => {
  it('should return true if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getOppositeBooleanProperty(propertyValue);
    expect(result).toEqual(true);
  });

  it('should return false if propertyValue is set true', () => {
    const propertyValue = true;
    const result = getOppositeBooleanProperty(propertyValue);
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set false', () => {
    const propertyValue = false;
    const result = getOppositeBooleanProperty(propertyValue);
    expect(result).toEqual(true);
  });
});

describe('getNumberProperty function', () => {
  it('should return default defaultValue if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getNumberProperty(propertyValue);
    expect(result).toEqual(0);
  });

  it('should return different defaultValue if propertyValue is undefined and defaultValue is set', () => {
    const propertyValue = undefined;
    const defaultValue = 5;
    const result = getNumberProperty(propertyValue, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should return propertyValue if propertyValue is set', () => {
    const propertyValue = 1;
    const result = getNumberProperty(propertyValue);
    expect(result).toEqual(propertyValue);
  });

  it('should return negative number if propertyValue is set to a negative number', () => {
    const propertyValue = -1;
    const result = getNumberProperty(propertyValue);
    expect(result).toEqual(propertyValue);
  });
});

describe('getStringProperty function', () => {
  it('should return string empty if propertyValue is undefined and defaultValue is undefined', () => {
    const propertyValue = undefined;
    const defaultValue = undefined;
    const result = getStringProperty(propertyValue, defaultValue);
    expect(result).toEqual('');
  });

  it('should return propertyValue if propertyValue is set and defaultValue is undefined', () => {
    const propertyValue = 'test';
    const defaultValue = undefined;
    const result = getStringProperty(propertyValue, defaultValue);
    expect(result).toEqual(propertyValue);
  });

  it('should return defaultValue if propertyValue is undefined and defaultValue is set', () => {
    const propertyValue = undefined;
    const defaultValue = 'test';
    const result = getStringProperty(propertyValue, defaultValue);
    expect(result).toEqual(defaultValue);
  });
});
describe('getDarkTheme function', () => {
  it('should return undefined if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getDarkTheme(propertyValue);
    expect(result).toBe('light');
  });

  it('should return undefined if propertyValue is false', () => {
    const propertyValue = false;
    const result = getDarkTheme(propertyValue);
    expect(result).toBe('light');
  });

  it('should return dark if propertyValue is true', () => {
    const propertyValue = true;
    const result = getDarkTheme(propertyValue);
    expect(result).toEqual('dark');
  });
});
describe('getDarkClass function', () => {
  it('should return empty string if propertyValue is undefined', () => {
    const propertyValue = undefined;
    const result = getDarkClass(propertyValue);
    expect(result).toBe('light');
  });

  it('should return empty string  if propertyValue is false', () => {
    const propertyValue = false;
    const result = getDarkClass(propertyValue);
    expect(result).toBe('light');
  });

  it('should return dark if propertyValue is true', () => {
    const propertyValue = true;
    const result = getDarkClass(propertyValue);
    expect(result).toEqual('dark');
  });
});
describe('getHideModule function', () => {
  it('should return false if properties is undefined', () => {
    const properties = undefined;
    const result = getHideModule(properties);
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {},
    };
    const result = getHideModule(properties);
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is false', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideModule: false,
      },
    };
    const result = getHideModule(properties);
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideModule: false,
      },
    };
    const result = getHideModule(properties);
    expect(result).toBe(false);
  });
  it('should return true if propertyValue is true', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideModule: true,
      },
    };
    const result = getHideModule(properties);
    expect(result).toBe(true);
  });
});
describe('getHideLayout function', () => {
  it('should return false if properties is undefined', () => {
    const properties = undefined;
    const result = getHideLayout(properties);
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {},
    };
    const result = getHideLayout(properties);
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is false', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideLayout: false,
      },
    };
    const result = getHideLayout(properties);
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideLayout: false,
      },
    };
    const result = getHideLayout(properties);
    expect(result).toBe(false);
  });
  it('should return true if propertyValue is true', () => {
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideLayout: true,
      },
    };
    const result = getHideLayout(properties);
    expect(result).toBe(true);
  });
});
describe('getHeadingTag function', () => {
  it('should return hard-coded default value if headingLevel is undefined', () => {
    const headingLevel = undefined;
    const result = getHeadingTag(headingLevel);
    expect(result).toEqual('h2');
  });
  it('should return default value if headingLevel is undefined', () => {
    const headingLevel = undefined;
    const result = getHeadingTag(headingLevel, 'h3');
    expect(result).toEqual('h3');
  });
  it('should return value if headingLevel is passed', () => {
    const headingLevel = 'h4';
    const result = getHeadingTag(headingLevel, 'h3');
    expect(result).toEqual('h4');
  });
});
describe('getHeadingTagNumber function', () => {
  it('should return hard-coded default value if headingLevel is undefined', () => {
    const headingLevel = undefined;
    const result = getHeadingTagNumber(headingLevel);
    expect(result).toEqual('2');
  });

  it('should return number value if headingLevel is passed', () => {
    const headingLevel = 'h4';
    const result = getHeadingTagNumber(headingLevel);
    expect(result).toEqual('4');
  });
});
