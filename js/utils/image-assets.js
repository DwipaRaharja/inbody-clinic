const formatFolders = {
  avif: 'avif',
  jpeg: 'jpeg',
  jpg: 'jpeg',
  png: 'png',
  webp: 'webp',
};

const fileExtensions = {
  avif: 'avif',
  jpeg: 'jpeg',
  jpg: 'jpg',
  png: 'png',
  webp: 'webp',
};

function relativeImagePath(path) {
  return path
    .replace(/^\.\/assets\/images\//u, '')
    .replace(/^\.\/assets\/gallery\//u, 'gallery/')
    .replace(/^\.\/assets\/logo\//u, 'logo/')
    .replace(/^(?:avif|jpeg|png|webp)\//u, '');
}

export function imageAsset(path) {
  const relativePath = relativeImagePath(path);
  const extension = relativePath.match(/\.([^.]+)$/u)?.[1]?.toLowerCase();
  const formatFolder = formatFolders[extension];

  if (!formatFolder) throw new Error(`Unsupported image format in path: ${path}`);
  return `./assets/images/${formatFolder}/${relativePath}`;
}

export function imageVariant(path, format) {
  const extension = fileExtensions[format];
  if (!extension) throw new Error(`Unsupported image variant format: ${format}`);

  const relativePath = relativeImagePath(path).replace(/\.[^.]+$/u, '');
  return imageAsset(`${relativePath}.${extension}`);
}
