import React from 'react';

// Floating ambient developer symbols with light blue and warm mud-clay tones
export default function FloatingParticles() {
  const symbols = [
    { text: '{ }', color: 'text-sky-400/35' },
    { text: '</>', color: 'text-[#C4A482]/40' },
    { text: '=>', color: 'text-sky-300/30' },
    { text: 'const', color: 'text-[#A89078]/35' },
    { text: 'let', color: 'text-sky-400/25' },
    { text: 'async', color: 'text-[#C4A482]/30' },
    { text: '<div>', color: 'text-sky-300/35' },
    { text: '===', color: 'text-[#8C765E]/40' },
    { text: 'px', color: 'text-sky-400/30' },
    { text: 'useState', color: 'text-[#C4A482]/35' },
    { text: 'O(1)', color: 'text-sky-300/35' },
    { text: '[]', color: 'text-[#A89078]/30' },
    { text: '#!', color: 'text-sky-400/30' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {symbols.map((sym, i) => {
        const top = (i * 17) % 95;
        const left = (i * 23 + 5) % 95;
        const duration = 12 + (i % 6) * 3;
        const delay = (i % 5) * 1.5;

        return (
          <span
            key={i}
            className={`absolute font-mono text-xs md:text-sm font-semibold ${sym.color}`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animation: `floatParticle ${duration}s ease-in-out ${delay}s infinite alternate`
            }}
          >
            {sym.text}
          </span>
        );
      })}
      <style>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-24px) rotate(8deg);
          }
          100% {
            transform: translateY(16px) rotate(-8deg);
          }
        }
      `}</style>
    </div>
  );
}
