import {
  enrichPagination,
  getNextPage,
  getPageNumber,
  getPreviousPage,
  HasNextUrl,
  HasPreviousUrl,
} from '@/components/commons/list/Pagination/PaginationHelper';
import { Pagination } from '@/models/types/forge';

// ARRANGE
const paginationEmpty = {
  page: 0,
};
const pagination0 = {
  nextUrl: '?page=1',
  previousUrl: '',
  page: 0,
};
const pagination = {
  maxItems: 100,
  hasPagination: undefined,
  page: 1,
};
const pagination2 = {
  nextUrl: '?page=2',
  previousUrl: '?page=0',
  page: 1,
};
const pagination3 = {
  nextUrl: '?page=4',
  previousUrl: '?page=2',
  page: 3,
};
const pagination4 = {
  nextUrl: '?page=1',
  previousUrl: '',
  page: 0,
};

describe('HasNextUrl', (): void => {
  test('should return false if pagination is null', (): void => {
    // ACT
    const result = HasNextUrl(null);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return false if pagination is undefined', (): void => {
    // ACT
    const result = HasNextUrl(null);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return false if pagination has no nextUrl', (): void => {
    // ACT
    const result = HasNextUrl(pagination as Pagination);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return true if pagination has nextUrl', (): void => {
    // ACT
    const result = HasNextUrl(pagination2 as Pagination);
    // ASSERT
    expect(result).toEqual(true);
  });
});
describe('HasPreviousUrl', (): void => {
  test('should return false if pagination is null', (): void => {
    // ACT
    const result = HasPreviousUrl(null);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return false if pagination is undefined', (): void => {
    // ACT
    const result = HasPreviousUrl(null);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return false if pagination has no previousUrl', (): void => {
    // ACT
    const result = HasPreviousUrl(pagination as Pagination);
    // ASSERT
    expect(result).toEqual(false);
  });
  test('should return true if pagination has previousUrl', (): void => {
    // ACT
    const result = HasPreviousUrl(pagination2 as Pagination);
    // ASSERT
    expect(result).toEqual(true);
  });
});
describe('getNextPage', (): void => {
  test('should return 0 if pagination is null', (): void => {
    // ACT
    const result = getNextPage(null);
    // ASSERT
    expect(result).toEqual(0);
  });
  test('should return 0 if pagination has no page', (): void => {
    // ACT
    const result = getNextPage(pagination as Pagination);
    // ASSERT
    expect(result).toEqual(0);
  });
  test('should return 0 if pagination has page 0 but not have nextUrl', (): void => {
    // ACT
    const result = getNextPage(paginationEmpty as Pagination);
    // ASSERT
    expect(result).toEqual(0);
  });
  test('should return 1 if pagination has already a nextUrl and page=0', (): void => {
    // ACT
    const result = getNextPage(pagination0 as Pagination);
    // ASSERT
    expect(result).toEqual(1);
  });
  test('should return page 2 if pagination has page=1', (): void => {
    // ACT
    const result = getNextPage(pagination2 as Pagination);
    // ASSERT
    expect(result).toEqual(2);
  });
  test('should return page 4 if pagination has page=3', (): void => {
    // ACT
    const result = getNextPage(pagination3 as Pagination);
    // ASSERT
    expect(result).toEqual(4);
  });
  test('should return page 1 if pagination has page=0', (): void => {
    // ACT
    const result = getNextPage(pagination4 as Pagination);
    // ASSERT
    expect(result).toEqual(1);
  });
  test('should return page 2 if has already a not standard next url but have page=1', (): void => {
    // ARRANGE
    const paginationNext = {
      nextUrl: '?myurl',
      previousUrl: '',
      page: 1,
    };
    // ACT
    const result = getNextPage(paginationNext as Pagination);
    // ASSERT
    expect(result).toEqual(2);
  });
});
describe('getPreviousPage', (): void => {
  test('should return -1 if pagination is null', (): void => {
    // ACT
    const result = getPreviousPage(null);
    // ASSERT
    expect(result).toEqual(-1);
  });
  test('should return -1 if pagination has no page', (): void => {
    // ACT
    const result = getPreviousPage(pagination as Pagination);
    // ASSERT
    expect(result).toEqual(-1);
  });
  test('should return page 0 if pagination has page=1', (): void => {
    // ACT
    const result = getPreviousPage(pagination2 as Pagination);
    // ASSERT
    expect(result).toEqual(0);
  });
  test('should return page 2 if pagination has page=3', (): void => {
    // ACT
    const result = getPreviousPage(pagination3 as Pagination);
    // ASSERT
    expect(result).toEqual(2);
  });
  test('should return page 0 if has already a not standard prev url and page 1', (): void => {
    // ARRANGE
    const paginationPrev = {
      nextUrl: 'test',
      previousUrl: '?myurl',
      page: 1,
    };
    // ACT
    const result = getPreviousPage(paginationPrev as Pagination);
    // ASSERT
    expect(result).toEqual(0);
  });
});
describe('getPageNumber', (): void => {
  test('should return 1 if parameters are undefined', (): void => {
    // ACT
    const result = getPageNumber(undefined, undefined);
    // ASSERT
    expect(result).toEqual(1);
  });
  test('should return 1 if variable page is undefined', (): void => {
    // ACT
    const result = getPageNumber(undefined, 2);
    // ASSERT
    expect(result).toEqual(1);
  });
  test('should return 1 if variable page is 2 and hasPagination is undefined', (): void => {
    // ACT
    const result = getPageNumber(undefined, 2);
    // ASSERT
    expect(result).toEqual(1);
  });
  test('should return 1 if variable page is 2 and hasPagination is false', (): void => {
    // ACT
    const result = getPageNumber(false, 2);
    // ASSERT
    expect(result).toEqual(1);
  });
  test('should return 2 if variable page is 2 and hasPagination is true', (): void => {
    // ACT
    const result = getPageNumber(true, 2);
    // ASSERT
    expect(result).toEqual(2);
  });
});
describe('enrichPagination', (): void => {
  test('should return empty pagination if parameters are null', (): void => {
    // ACT
    const result = enrichPagination(null, undefined, undefined);
    // ASSERT
    expect(result).toEqual({ hasPagination: undefined, page: 1 });
  });
  test('should return enriched pagination if pagination is not null', (): void => {
    // ACT
    const result = enrichPagination(pagination, undefined, undefined);
    // ASSERT
    expect(result).toEqual({ ...pagination, hasPagination: undefined, page: 1 });
  });
  test('should return enriched pagination if pagination and hasPagination are not null', (): void => {
    // ACT
    const result = enrichPagination(pagination, true, undefined);
    // ASSERT
    expect(result).toEqual({ ...pagination, hasPagination: true, page: 1 });
  });
  test('should return enriched pagination if pagination is not null and hasPagination is false', (): void => {
    // ACT
    const result = enrichPagination(pagination, false, undefined);
    // ASSERT
    expect(result).toEqual({ ...pagination, hasPagination: false, page: 1 });
  });
  test('should return enriched pagination if parameters are not null', (): void => {
    // ACT
    const result = enrichPagination(pagination, true, 2);
    // ASSERT
    expect(result).toEqual({ ...pagination, hasPagination: true, page: 2 });
  });
});
