export function setQueryParam(key: string, value: string) {
  const queryParam = new URLSearchParams(window.location.search);
  queryParam.set(key, value);
  window.history.pushState({}, '', `${window.location.pathname}?${queryParam}`);
}

export function getQueryParam(key: string) {
  const queryParam = new URLSearchParams(window.location.search);
  return queryParam.get(key);
}
