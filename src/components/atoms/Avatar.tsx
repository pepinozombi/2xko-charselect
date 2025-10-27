import { useState } from "react";
import { Skeleton } from "./Skeleton";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  fallbackInitials?: string;
}

export function Avatar({ src, alt, size = 48, fallbackInitials }: AvatarProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Generar color de fondo basado en el alt text
  const getBackgroundColor = (text?: string) => {
    if (!text) return '#6B7280';
    const colors = [
      '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
      '#EC4899', '#14B8A6', '#F97316', '#84CC16', '#06B6D4'
    ];
    const hash = text.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const style = { width: size, height: size };

  if (loading) {
    return <Skeleton width={size} height={size} variant="circular" />;
  }

  if (error || !src) {
    return (
      <div
        className="border-2 border-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-lg"
        style={{
          ...style,
          backgroundColor: getBackgroundColor(alt),
          fontSize: size * 0.4,
          borderRadius: '4px'
        }}
      >
        {fallbackInitials || alt?.charAt(0)?.toUpperCase() || '?'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'avatar'}
      width={size}
      height={size}
      className="border-2 border-gray-600 object-cover shadow-lg"
      style={{...style, borderRadius: '4px'}}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}