export const normalizeExternalUrl = (url: string): string =>
  /^https?:\/\//i.test(url) ? url : `https://${url}`;
