/**
 * Resolves static public assets correctly across local development and GitHub Pages subpaths.
 */
export function getAssetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  
  // If path already starts with cleanBase, don't prefix it again
  if (path.startsWith(cleanBase)) {
    return path;
  }
  
  const cleanBaseNoSlash = cleanBase.replace(/^\/+/, '');
  const cleanPath = path.replace(/^\/+/, '');
  
  // If path without leading slash starts with base without leading slash, just ensure leading slash
  if (cleanBaseNoSlash && cleanPath.startsWith(cleanBaseNoSlash)) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
}
