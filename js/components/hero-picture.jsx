import { assetUrl } from '../utils/urls.js';

// Route-hero photos ship WebP variants (image.webp: [{ src, width }], capped at
// each master's natural width) so modern browsers fetch a right-sized WebP while
// the original file stays the no-srcset fallback. Records without variants keep
// the plain <img> they always rendered, so usages below the fold (lazy cards,
// portraits) need zero markup change.
// className frames the <picture>; imgClassName carries the object-fit rules —
// <picture> is display:inline by default and would break the aspect/positioning
// classes otherwise.
export function HeroPicture({ image, className, imgClassName, imgStyle, ...imgProps }) {
  const src = assetUrl(image.src);
  const img = <img className={imgClassName} src={src} alt={image.alt} width={image.width} height={image.height} style={imgStyle} {...imgProps} />;
  if (!image.webp?.length) return img;
  const srcSet = image.webp.map((variant) => `${assetUrl(variant.src)} ${variant.width}w`).join(', ');
  return <picture className={className}>
    <source type="image/webp" srcSet={srcSet} sizes={image.sizes} />
    {img}
  </picture>;
}
