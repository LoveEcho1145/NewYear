import { useState, useEffect } from 'react';

interface Blessing {
  id: number;
  text: string;
  meaning: string;
}

const blessings: Blessing[] = [
  { id: 1, text: '马到成功', meaning: '事业顺利，一举成功' },
  { id: 2, text: '龙马精神', meaning: '精力充沛，活力四射' },
  { id: 3, text: '一马当先', meaning: '勇往直前，领先他人' },
  { id: 4, text: '万马奔腾', meaning: '气势磅礴，兴旺发达' },
  { id: 5, text: '策马扬鞭', meaning: '奋发图强，积极进取' },
  { id: 6, text: '金戈铁马', meaning: '英勇无畏，战无不胜' },
];

export function BlessingCards() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    blessings.forEach((blessing, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, blessing.id]);
      }, 500 + index * 100);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto px-4">
      {blessings.map((blessing) => (
        <div
          key={blessing.id}
          className={`relative cursor-pointer transition-all duration-500 ${
            visibleCards.includes(blessing.id) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setHoveredId(blessing.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div 
            className={`glass-effect rounded-xl p-4 md:p-6 text-center relative overflow-hidden
                       transition-transform duration-300 ${
                         hoveredId === blessing.id ? 'scale-105' : 'scale-100'
                       }`}
          >
            {/* Background glow on hover */}
            <div 
              className={`absolute inset-0 bg-gradient-radial from-horse-gold/20 to-transparent
                         transition-opacity duration-300 ${
                           hoveredId === blessing.id ? 'opacity-100' : 'opacity-0'
                         }`}
            />
            
            {/* Blessing text */}
            <h3 className="text-xl md:text-2xl font-bold text-gradient-gold mb-2 relative z-10">
              {blessing.text}
            </h3>
            
            {/* Meaning - shown on hover */}
            <p 
              className={`text-sm text-horse-gold/70 relative z-10 transition-all duration-300 ${
                hoveredId === blessing.id 
                  ? 'opacity-100 max-h-20' 
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
            >
              {blessing.meaning}
            </p>
            
            {/* Decorative border */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-horse-gold/40" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-horse-gold/40" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-horse-gold/40" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-horse-gold/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
