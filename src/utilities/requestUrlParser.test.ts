import { requestUrlParser } from './requestUrlParser';

describe('requestUrlParser', () => {
  describe('getPathName', () => {
    it('should return "/index" when params.pageName is an empty array', () => {
      // ARRANGE
      const params = { pageName: [] };

      // ACT
      const result = requestUrlParser.getPathName(params);

      // ASSERT
      expect(result).toBe('/index');
    });

    it('should return the correct path when params.pageName contains one element', () => {
      // ARRANGE
      const params = { pageName: ['about'] };

      // ACT
      const result = requestUrlParser.getPathName(params);

      // ASSERT
      expect(result).toBe('/about');
    });

    it('should return the correct path when params.pageName contains multiple elements', () => {
      // ARRANGE
      const params = { pageName: ['blog', 'post', '123'] };

      // ACT
      const result = requestUrlParser.getPathName(params);

      // ASSERT
      expect(result).toBe('/blog/post/123');
    });

    it('should return the correct path when params.pageName is defined', () => {
      // ARRANGE
      const params = { pageName: ['custom', 'path'] };

      // ACT
      const result = requestUrlParser.getPathName(params);

      // ASSERT
      expect(result).toBe('/custom/path');
    });
  });
});
