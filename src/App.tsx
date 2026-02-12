import { useState, useEffect } from 'react';
import { useCountdown } from './hooks/useCountdown';
import { CountdownUnit } from './components/CountdownUnit';
import { ParticleBackground } from './components/ParticleBackground';
import { FireworkEffect } from './components/FireworkEffect';
import { Lantern } from './components/Lantern';
import { BlessingCards } from './components/BlessingCard';
import { Sparkles, Calendar, Clock, Star, Zap } from 'lucide-react';

function App() {
  // 2026年春节日期：2026年2月17日
  const targetDate = new Date('2026-02-17T00:00:00');
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetDate);
  
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100);
    setTimeout(() => setContentVisible(true), 400);
    setTimeout(() => setFooterVisible(true), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0505] via-[#2d0a0a] to-[#1a0505] relative overflow-hidden">
      {/* Background Effects */}
      <FireworkEffect />
      <ParticleBackground />
      
      {/* Pattern Overlay */}
      <div className="fixed inset-0 bg-pattern pointer-events-none z-[1]" />
      
      {/* Lanterns */}
      <Lantern className="top-4 left-4 md:left-10" size="lg" delay={0} />
      <Lantern className="top-8 right-4 md:right-10" size="lg" delay={0.3} />
      <Lantern className="top-20 left-1/4 hidden md:block" size="md" delay={0.5} />
      <Lantern className="top-16 right-1/4 hidden md:block" size="md" delay={0.7} />
      
      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Header */}
        <header 
          className={`pt-8 pb-4 px-4 text-center transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-2 animate-pulse-gold">
            <Sparkles className="w-5 h-5 text-horse-gold" />
            <span className="text-horse-gold/80 text-sm md:text-base tracking-widest">
              农历丙午年 · 火马迎春
            </span>
            <Sparkles className="w-5 h-5 text-horse-gold" />
          </div>
          
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-gold font-serif mb-2
                       transition-all duration-1000 ${
                         headerVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-80'
                       }`}
          >
            马年倒计时
          </h1>
          
          <div 
            className={`flex items-center justify-center gap-3 text-horse-gold/60
                       transition-all duration-1000 delay-200 ${
                         headerVisible ? 'opacity-100' : 'opacity-0'
                       }`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-lg md:text-xl">2026年春节</span>
            <Zap className="w-5 h-5" />
          </div>
        </header>

        {/* Countdown Section */}
        <section className="flex-1 flex flex-col items-center justify-center py-8 md:py-12 px-4">
          {isComplete ? (
            <div 
              className={`text-center transition-all duration-800 ${
                contentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
            >
              <div className="animate-float">
                <Star className="w-32 h-32 mx-auto text-horse-gold mb-6" />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-gradient-gold mb-4">
                马年大吉！
              </h2>
              <p className="text-xl md:text-2xl text-horse-gold/80">
                祝您新春快乐，万事如意
              </p>
            </div>
          ) : (
            <>
              {/* Target Date Info */}
              <div 
                className={`flex items-center gap-2 mb-8 text-horse-gold/70
                           transition-all duration-1000 delay-300 ${
                             contentVisible ? 'opacity-100' : 'opacity-0'
                           }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm md:text-base">目标日期：2026年2月17日（正月初一）</span>
              </div>

              {/* Countdown Display */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mb-12">
                <CountdownUnit value={days} label="天" />
                <CountdownUnit value={hours} label="时" />
                <CountdownUnit value={minutes} label="分" />
                <CountdownUnit value={seconds} label="秒" />
              </div>

              {/* Decorative Divider */}
              <div 
                className={`flex items-center gap-4 mb-12 transition-all duration-1000 delay-500 ${
                  contentVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-16 md:w-32 h-px bg-gradient-to-r from-transparent to-horse-gold/50" />
                <Clock className="w-5 h-5 text-horse-gold/60" />
                <div className="w-16 md:w-32 h-px bg-gradient-to-l from-transparent to-horse-gold/50" />
              </div>

              {/* Blessings Section */}
              <div 
                className={`w-full transition-all duration-1000 delay-700 ${
                  contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gradient-gold text-center mb-8">
                  马年祝福语
                </h2>
                <BlessingCards />
              </div>
            </>
          )}
        </section>

        {/* Footer */}
        <footer 
          className={`py-6 px-4 text-center transition-all duration-1000 ${
            footerVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-horse-gold/40 text-sm">
            <Star className="w-4 h-4" />
            <span>丙午马年 · 火运亨通</span>
            <Star className="w-4 h-4" />
          </div>
          <p className="text-horse-gold/30 text-xs mt-2">
            天干丙属火 · 地支午为马 · 天运五行属水
          </p>
        </footer>
      </div>

      {/* Corner Decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-30">
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-horse-gold/30" />
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-30">
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-horse-gold/30" />
      </div>
      <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none z-30">
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-horse-gold/30" />
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-30">
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-horse-gold/30" />
      </div>
    </div>
  );
}

export default App;
