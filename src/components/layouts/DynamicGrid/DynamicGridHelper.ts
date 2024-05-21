/**
 * Given a column template, it returns the grid's CSS classes to be applied to the child(ren) that must span
 * @param columns the input string representing the columns' structure
 * @returns Tailwind CSS helper classes on the child(ren) container
 */
export const getGridChildrenCssClasses = (columns: string) => {
  switch (columns) {
    case '3-3-3-3':
      return ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3'];
    case '3-6-3':
      return ['lg:col-span-3', 'lg:col-span-6', 'lg:col-span-3'];
    case '2-8-2':
      return ['lg:col-span-2', 'lg:col-span-8', 'lg:col-span-2'];
    case '6-6':
      return ['lg:col-span-6', 'lg:col-span-6'];
    case '4-4-4':
      return ['lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4'];
    case '3-9':
      return ['lg:col-span-3', 'lg:col-span-9'];
    case '9-3':
      return ['lg:col-span-9', 'lg:col-span-3'];
    default:
      return ['lg:col-span-12'];
  }
};
