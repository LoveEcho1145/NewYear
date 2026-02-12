import { useState, useEffect } from 'react';

interface CountdownUnitProps {
  value: number;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const [isVisible, setIsVisible] = useState(false);
  const formattedValue = value.toString().padStart(2, '0');
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`flex flex-col items-center transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="relative group">
        <div 
          className="w-20 h-24 sm:w-24 sm:h-32 md:w-32 md:h-40 lg:w-36 lg:h-44 
                     bg-gradient-to-br from-horse-red-dark via-horse-red to-horse-red-light
                     rounded-xl border-2 border-horse-gold/50
                     flex items-center justify-center
                     shadow-gold animate-border-glow
                     transition-transform duration-300 group-hover:scale-105"
        >
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-gold font-serif">
            {formattedValue}
          </span>
        </div>
        
        {/* Decorative corners */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-horse-gold" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-horse-gold" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-horse-gold" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-horse-gold" />
      </div>
      
      <span className="mt-3 text-sm sm:text-base md:text-lg text-horse-gold/80 font-serif tracking-widest">
        {label}
      </span>
    </div>
  );
}
