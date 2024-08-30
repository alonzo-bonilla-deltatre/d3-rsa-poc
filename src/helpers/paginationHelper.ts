import { getBooleanProperty, getNumberProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { Pagination } from '@/models/types/forge';

/**
 * Checks if the pagination object has a next URL.
 * @param {Pagination | null} [pagination] - The pagination object.
 * @returns {boolean} - True if the next URL exists, false otherwise.
 */
export const HasNextUrl = (pagination?: Pagination | null): boolean => {
  return pagination !== undefined && pagination !== null && getStringProperty(pagination?.nextUrl) !== '';
};

/**
 * Checks if the pagination object has a previous URL.
 * @param {Pagination | null} [pagination] - The pagination object.
 * @returns {boolean} - True if the previous URL exists, false otherwise.
 */
export const HasPreviousUrl = (pagination?: Pagination | null): boolean => {
  return pagination !== undefined && pagination !== null && getStringProperty(pagination?.previousUrl) !== '';
};

/**
 * Gets the next page number from the pagination object.
 * @param {Pagination | null} [pagination] - The pagination object.
 * @returns {number} - The next page number, or 0 if there is no next URL.
 */
export const getNextPage = (pagination?: Pagination | null): number => {
  return HasNextUrl(pagination) ? getNumberProperty(pagination?.page, 1) + 1 : 0;
};

/**
 * Gets the previous page number from the pagination object.
 * @param {Pagination | null} [pagination] - The pagination object.
 * @returns {number} - The previous page number, or -1 if there is no previous URL.
 */
export const getPreviousPage = (pagination: Pagination | undefined | null): number => {
  return HasPreviousUrl(pagination) ? getNumberProperty(pagination?.page, 1) - 1 : -1;
};

/**
 * Gets the current page number based on the pagination status.
 * @param {boolean} [hasPagination] - Indicates if pagination is enabled.
 * @param {number} [page] - The current page number.
 * @returns {number} - The current page number, or 1 if pagination is not enabled.
 */
export const getPageNumber = (hasPagination?: boolean, page?: number): number => {
  return page && getBooleanProperty(hasPagination) ? Number(page) : 1;
};

/**
 * Enriches the pagination object with additional properties.
 * @param {Pagination | null} [paginationData] - The original pagination data.
 * @param {boolean} [hasPagination] - Indicates if pagination is enabled.
 * @param {number} [page] - The current page number.
 * @returns {Pagination} - The enriched pagination object.
 */
export const enrichPagination = (
  paginationData?: Pagination | null,
  hasPagination?: boolean,
  page?: number
): Pagination => {
  return {
    ...paginationData,
    page: getPageNumber(hasPagination, page),
    hasPagination: hasPagination,
  } as Pagination;
};
