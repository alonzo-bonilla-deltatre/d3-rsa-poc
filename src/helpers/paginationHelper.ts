import { getBooleanProperty, getNumberProperty, getStringProperty } from '@/helpers/pageComponentPropertyHelper';
import { Pagination } from '@/models/types/forge';

export const HasNextUrl = (pagination?: Pagination | null): boolean => {
  return pagination !== undefined && pagination !== null && getStringProperty(pagination?.nextUrl) !== '';
};
export const HasPreviousUrl = (pagination?: Pagination | null): boolean => {
  return pagination !== undefined && pagination !== null && getStringProperty(pagination?.previousUrl) !== '';
};

export const getNextPage = (pagination?: Pagination | null): number => {
  return HasNextUrl(pagination) ? getNumberProperty(pagination?.page, 1) + 1 : 0;
};

export const getPreviousPage = (pagination: Pagination | undefined | null): number => {
  return HasPreviousUrl(pagination) ? getNumberProperty(pagination?.page, 1) - 1 : -1;
};

export const getPageNumber = (hasPagination?: boolean, page?: number): number => {
  return page && getBooleanProperty(hasPagination) ? Number(page) : 1;
};

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
