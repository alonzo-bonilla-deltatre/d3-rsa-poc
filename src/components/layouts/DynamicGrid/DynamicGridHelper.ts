/**
 * Given a column template, it returns the grid's CSS classes to be applied to the container
 * @param columns the input string representing the columns' structure
 * @returns Tailwind CSS helper classes on the grid container
 */
export const getGridContainerCssClasses = (columns: string = '6-6') => {
  const classes = 'grid grid-cols-1';
  switch (columns) {
    case '3-3-3-3':
    case '3-6-3':
    case '3-9':
    case '9-3':
      return classes + ' lg:grid-cols-4';
    case '6-6':
      return classes + ' lg:grid-cols-2';
    case '4-4-4':
      return classes + ' lg:grid-cols-3';
    default:
      return classes;
  }
};

/**
 * Given a column template, it returns the grid's CSS classes to be applied to the child(ren) that must span
 * @param columns the input string representing the columns' structure
 * @returns Tailwind CSS helper classes on the child(ren) container
 */
export const getGridChildrenCssClasses = (columns: string) => {
  switch (columns) {
    case '3-6-3':
      return ['', ' col-span-2 ', ''];
    case '3-9':
      return ['', ' col-span-3 '];
    case '9-3':
      return [' col-span-3 ', ''];
    default:
      return [' col-span-1 '];
  }
};
