export const requestUrlParser = {
  getPathName: (params: { pageName: string[] }): string => {
    const pageName = params.pageName || [];
    const url = `/${pageName.join('/')}`;
    return url === '/' ? '/index' : url;
  },
};
