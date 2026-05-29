/** Normalize internal paths for trailingSlash: 'always' */
export function withTrailingSlash(path: string): string {
  if (!path || path === '/') return '/';
  if (path.startsWith('http') || path.startsWith('#') || path.includes('?')) {
    return path;
  }
  return path.endsWith('/') ? path : `${path}/`;
}
