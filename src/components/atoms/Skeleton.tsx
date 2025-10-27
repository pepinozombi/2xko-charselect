interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  className = '', 
  variant = 'rectangular' 
}: SkeletonProps) {
  const baseClasses = `
    animate-pulse relative overflow-hidden
    bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%]
    border-2 border-gray-400
    shadow-inner
    before:content-[''] before:absolute before:inset-0 
    before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
    before:translate-x-[-100%] before:animate-[shimmer_1.5s_infinite]
  `;
  
  const variantClasses = {
    text: 'rounded border-gray-300',
    circular: 'rounded-full border-gray-400',
    rectangular: 'rounded border-gray-400'
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div 
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
      />
    </>
  );
}