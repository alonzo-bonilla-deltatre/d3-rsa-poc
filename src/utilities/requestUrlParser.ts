export const requestUrlParser = {
  getPathName: (params: { pageName: string[] }): string => {
    let path = "/index";
    if (Object.hasOwn(params, "pageName")) {
      path = `/${params.pageName.join("/")}`;
    }
    return `${path}`;
  },
};
