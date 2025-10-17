export function Avatar({ src, alt, size = 48 }: { src: string; alt?: string; size?: number }) {
  return (
    <img
      src={src}
      alt={alt || 'avatar'}
      width={size}
      height={size}
      className="rounded-md object-cover"
      style={{ width: size, height: size }}
    />
  );
}