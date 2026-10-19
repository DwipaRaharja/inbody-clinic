export const basePath = import.meta.env.BASE_URL;

export function siteUrl(value) {
  if (!value || /^(?:#|[a-z][a-z\d+.-]*:|\/\/)/iu.test(value)) return value;
  if (value.startsWith('./')) return basePath + value.slice(2);
  if (value.startsWith('/')) return basePath + value.slice(1);
  return basePath + value;
}

export const assetUrl = siteUrl;

export function stripBase(pathname) {
  if (pathname === basePath.slice(0, -1)) return '/';
  if (!pathname.startsWith(basePath)) return null;
  return '/' + pathname.slice(basePath.length);
}
