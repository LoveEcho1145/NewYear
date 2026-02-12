import { useState, useEffect } from 'react';

interface LanternProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export function Lantern({ className = '', size = 'md', delay = 0 }: LanternProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-10',
    md: 'w-12 h-16',
    lg: 'w-16 h-20',
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute ${className} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'
      }`}
    >
      <div
        className={`${sizeClasses[size]} relative animate-lantern-sway`}
        style={{ transformOrigin: 'top center' }}
      >
        {/* String */}
        <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-horse-gold/50 -translate-x-1/2" />
        
        {/* Lantern body */}
        <div className="w-full h-full bg-gradient-to-b from-horse-red to-horse-red-dark rounded-full border-2 border-horse-gold shadow-gold relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-radial from-horse-gold/30 to-transparent" />
          
          {/* Decorative pattern */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-horse-gold/50" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-horse-gold/50" />
          
          {/* Chinese character */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-horse-gold text-lg font-bold">福</span>
          </div>
        </div>
        
        {/* Tassel */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-0.5 h-6 bg-horse-gold/70" />
          <div className="flex gap-0.5 justify-center mt-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 h-4 bg-horse-gold/60 animate-lantern-sway"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
