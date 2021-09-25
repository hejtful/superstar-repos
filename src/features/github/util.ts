export const buildGitHubApiQueryParam = <T>(params: T) => {
  const paramKeys = Object.keys(params) as Array<keyof T>;

  return paramKeys.reduce((queryString, currentParamKey) => {
    const currentParamValue = params[currentParamKey];

    if (!currentParamValue) return queryString;

    return queryString.concat(`${currentParamKey}:"${currentParamValue}"`);
  }, '');
};
