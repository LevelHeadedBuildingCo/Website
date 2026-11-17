interface PhotoProps {
  /** Either a full path (/images/uploads/x.jpg) or a base path with no extension for which .webp + .jpg both exist. */
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  eager?: boolean;
  sizes?: string;
}

export function Photo({ src, alt, width, height, className, eager, sizes }: PhotoProps) {
  const hasExt = /\.[a-z0-9]{3,4}$/i.test(src);
  const loading = eager ? 'eager' : 'lazy';
  const fetchPriority = eager ? ('high' as const) : undefined;
  if (hasExt) {
    return <img src={src} alt={alt} width={width} height={height} className={className} loading={loading} decoding="async" fetchPriority={fetchPriority} />;
  }
  return (
    <picture className={className}>
      <source srcSet={`${src}.webp`} type="image/webp" sizes={sizes} />
      <img src={`${src}.jpg`} alt={alt} width={width} height={height} loading={loading} decoding="async" fetchPriority={fetchPriority} />
    </picture>
  );
}
