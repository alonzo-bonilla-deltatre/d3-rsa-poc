import {
  getBooleanProperty,
  getBooleanPropertyDefault,
  getBooleanPropertyFromString,
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
    // ARRANGE
    const propertyValue = undefined;
    // ACT
    const result = getBooleanProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set true', () => {
    // ARRANGE
    const propertyValue = true;
    // ACT
    const result = getBooleanProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return false if propertyValue is set false', () => {
    // ARRANGE
    const propertyValue = false;
    // ACT
    const result = getBooleanProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(false);
  });
});

describe('getBooleanProperty function', () => {
  it('should return false if propertyValue is undefined', () => {
    // ARRANGE
    const propertyValue = undefined;
    // ACT
    const result = getBooleanPropertyFromString(propertyValue);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set true', () => {
    // ARRANGE
    const propertyValue = 'True';
    // ACT
    const result = getBooleanPropertyFromString(propertyValue);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return true if propertyValue is set true', () => {
    // ARRANGE
    const propertyValue = 'true';
    // ACT
    const result = getBooleanPropertyFromString(propertyValue);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return false if propertyValue is set false', () => {
    // ARRANGE
    const propertyValue = 'false';
    // ACT
    const result = getBooleanPropertyFromString(propertyValue);
    // ASSERT
    expect(result).toEqual(false);
  });
});

describe('getBooleanPropertyDefault function', () => {
  it('should return false if propertyValue is undefined', () => {
    // ARRANGE
    const propertyValue = undefined;
    const defaultValue = undefined;
    // ACT
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set true', () => {
    // ARRANGE
    const propertyValue = true;
    const defaultValue = undefined;
    // ACT
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(propertyValue);
  });

  it('should return false if propertyValue is set false', () => {
    // ARRANGE
    const propertyValue = false;
    const defaultValue = undefined;
    // ACT
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(propertyValue);
  });

  it('should return true if propertyValue is undefined and defaultValue is set true', () => {
    // ARRANGE
    const propertyValue = undefined;
    const defaultValue = true;
    // ACT
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(defaultValue);
  });

  it('should return false if propertyValue is undefined and defaultValue is set false', () => {
    // ARRANGE
    const propertyValue = undefined;
    const defaultValue = false;
    // ACT
    const result = getBooleanPropertyDefault(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(defaultValue);
  });
});
describe('getOppositeBooleanProperty function', () => {
  it('should return true if propertyValue is undefined', () => {
    // ARRANGE
    const propertyValue = undefined;
    // ACT
    const result = getOppositeBooleanProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(true);
  });

  it('should return false if propertyValue is set true', () => {
    // ARRANGE
    const propertyValue = true;
    // ACT
    const result = getOppositeBooleanProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(false);
  });

  it('should return true if propertyValue is set false', () => {
    // ARRANGE
    const propertyValue = false;
    // ACT
    const result = getOppositeBooleanProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(true);
  });
});

describe('getNumberProperty function', () => {
  it('should return default defaultValue if propertyValue is undefined', () => {
    // ARRANGE
    const propertyValue = undefined;
    // ACT
    const result = getNumberProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(0);
  });

  it('should return different defaultValue if propertyValue is undefined and defaultValue is set', () => {
    // ARRANGE
    const propertyValue = undefined;
    const defaultValue = 5;
    // ACT
    const result = getNumberProperty(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(defaultValue);
  });

  it('should return propertyValue if propertyValue is set', () => {
    // ARRANGE
    const propertyValue = 1;
    // ACT
    const result = getNumberProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(propertyValue);
  });

  it('should return negative number if propertyValue is set to a negative number', () => {
    // ARRANGE
    const propertyValue = -1;
    // ACT
    const result = getNumberProperty(propertyValue);
    // ASSERT
    expect(result).toEqual(propertyValue);
  });
});

describe('getStringProperty function', () => {
  it('should return string empty if propertyValue is undefined and defaultValue is undefined', () => {
    // ARRANGE
    const propertyValue = undefined;
    const defaultValue = undefined;
    // ACT
    const result = getStringProperty(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual('');
  });

  it('should return propertyValue if propertyValue is set and defaultValue is undefined', () => {
    // ARRANGE
    const propertyValue = 'test';
    const defaultValue = undefined;
    // ACT
    const result = getStringProperty(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(propertyValue);
  });

  it('should return defaultValue if propertyValue is undefined and defaultValue is set', () => {
    // ARRANGE
    const propertyValue = undefined;
    const defaultValue = 'test';
    // ACT
    const result = getStringProperty(propertyValue, defaultValue);
    // ASSERT
    expect(result).toEqual(defaultValue);
  });
});
describe('getHideModule function', () => {
  it('should return false if properties is undefined', () => {
    // ARRANGE
    const properties = undefined;
    // ACT
    const result = getHideModule(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {},
    };
    // ACT
    const result = getHideModule(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is false', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideModule: false,
      },
    };
    // ACT
    const result = getHideModule(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideModule: false,
      },
    };
    // ACT
    const result = getHideModule(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return true if propertyValue is true', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideModule: true,
      },
    };
    // ACT
    const result = getHideModule(properties);
    // ASSERT
    expect(result).toBe(true);
  });
});
describe('getHideLayout function', () => {
  it('should return false if properties is undefined', () => {
    // ARRANGE
    const properties = undefined;
    // ACT
    const result = getHideLayout(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {},
    };
    // ACT
    const result = getHideLayout(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is false', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideLayout: false,
      },
    };
    // ACT
    const result = getHideLayout(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return false if propertyValue is undefined', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideLayout: false,
      },
    };
    // ACT
    const result = getHideLayout(properties);
    // ASSERT
    expect(result).toBe(false);
  });
  it('should return true if propertyValue is true', () => {
    // ARRANGE
    const properties = {
      type: PageStructureItemType.module,
      slot: 'slot',
      properties: {
        hideLayout: true,
      },
    };
    // ACT
    const result = getHideLayout(properties);
    // ASSERT
    expect(result).toBe(true);
  });
});
describe('getHeadingTag function', () => {
  it('should return hard-coded default value if headingLevel is undefined', () => {
    // ARRANGE
    const headingLevel = undefined;
    // ACT
    const result = getHeadingTag(headingLevel);
    // ASSERT
    expect(result).toEqual('h2');
  });
  it('should return default value if headingLevel is undefined', () => {
    // ARRANGE
    const headingLevel = undefined;
    // ACT
    const result = getHeadingTag(headingLevel, 'h3');
    // ASSERT
    expect(result).toEqual('h3');
  });
  it('should return value if headingLevel is passed', () => {
    // ARRANGE
    const headingLevel = 'h4';
    // ACT
    const result = getHeadingTag(headingLevel, 'h3');
    // ASSERT
    expect(result).toEqual('h4');
  });
});
describe('getHeadingTagNumber function', () => {
  it('should return hard-coded default value if headingLevel is undefined', () => {
    // ARRANGE
    const headingLevel = undefined;
    // ACT
    const result = getHeadingTagNumber(headingLevel);
    // ASSERT
    expect(result).toEqual('2');
  });

  it('should return number value if headingLevel is passed', () => {
    // ARRANGE
    const headingLevel = 'h4';
    // ACT
    const result = getHeadingTagNumber(headingLevel);
    // ASSERT
    expect(result).toEqual('4');
  });
});
