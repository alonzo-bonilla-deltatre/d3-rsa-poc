/* istanbul ignore file */
import { transformations } from '@/utilities/cloudinaryTransformations';
import { MosaicPattern } from './types';

export const desktopBasePattern: MosaicPattern = [
  {
    col: 'col-start-1 col-span-1',
    row: 'row-start-{row} row-span-1',
    transformation: transformations.mosaic_landscape,
  },
  {
    col: 'col-start-2 col-span-2',
    row: 'row-start-{row} row-span-2',
    transformation: transformations.mosaic_landscape,
  },
  {
    col: 'col-start-4 col-span-1',
    row: 'row-start-{row} row-span-1',
    transformation: transformations.mosaic_landscape,
  },
  {
    col: 'col-start-5 col-span-1',
    row: 'row-start-{row} row-span-1',
    transformation: transformations.mosaic_landscape,
  },
  {
    col: 'col-start-1 col-span-1',
    row: 'row-start-{row+1} row-span-1',
    transformation: transformations.mosaic_landscape,
  },
  {
    col: 'col-start-4 col-span-2',
    row: 'row-start-{row+1} row-span-2',
    transformation: transformations.mosaic_landscape_square,
  },
  {
    col: 'col-start-1 col-span-2',
    row: 'row-start-{row+2} row-span-2',
    transformation: transformations.mosaic_landscape_square,
  },
  {
    col: 'col-start-3 col-span-1',
    row: 'row-start-{row+2} row-span-1',
    transformation: transformations.mosaic_landscape_square,
  },
  {
    col: 'col-start-3 col-span-2',
    row: 'row-start-{row+3} row-span-1',
    transformation: transformations.mosaic_wide,
  },
  {
    col: 'col-start-5 col-span-1',
    row: 'row-start-{row+3} row-span-1',
    transformation: transformations.mosaic_landscape_square,
  },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  {
    col: 'col-start-2 col-span-2',
    row: 'row-start-{row+4} row-span-2',
    transformation: transformations.mosaic_square,
  },
  { col: 'col-start-4 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-5 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+5} row-span-1', transformation: transformations.mosaic_square },
  {
    col: 'col-start-4 col-span-2',
    row: 'row-start-{row+5} row-span-2',
    transformation: transformations.mosaic_square,
  },
  {
    col: 'col-start-1 col-span-2',
    row: 'row-start-{row+6} row-span-2',
    transformation: transformations.mosaic_portrait,
  },
  { col: 'col-start-3 col-span-1', row: 'row-start-{row+6} row-span-1', transformation: transformations.mosaic_square },
  {
    col: 'col-start-3 col-span-2',
    row: 'row-start-{row+7} row-span-1',
    transformation: transformations.mosaic_square,
  },
  {
    col: 'col-start-5 col-span-1',
    row: 'row-start-{row+7} row-span-1',
    transformation: transformations.mosaic_portrait_wide,
  },
];

export const mobileBasePattern: MosaicPattern = [
  { col: 'col-start-1 col-span-1', row: 'row-start-{row} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-2', row: 'row-start-{row+1} row-span-2', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+3} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row+3} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-2', row: 'row-start-{row+5} row-span-2', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+7} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row+7} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-2', row: 'row-start-{row+1} row-span-2', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+3} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row+3} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row+4} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-2', row: 'row-start-{row+5} row-span-2', transformation: transformations.mosaic_square },
  { col: 'col-start-1 col-span-1', row: 'row-start-{row+7} row-span-1', transformation: transformations.mosaic_square },
  { col: 'col-start-2 col-span-1', row: 'row-start-{row+7} row-span-1', transformation: transformations.mosaic_square },
];
