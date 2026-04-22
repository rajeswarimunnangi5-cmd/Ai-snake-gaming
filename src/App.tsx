import React, { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Trophy, Music, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-12 flex flex-col gap-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-500 font-mono text-sm tracking-[0.2em] uppercase"
            >
              <Music size={14} />
              <span>Synth & Snake</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-bold tracking-tighter text-white"
            >
              NEON<span className="text-zinc-800">PULSE</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 border-b border-zinc-800 pb-1 px-2">Current Score</span>
              <span className="text-3xl font-mono text-emerald-400 font-bold tracking-tighter">{score.toString().padStart(4, '0')}</span>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-2xl flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1 border-b border-zinc-800 pb-1 px-2">All Time Best</span>
              <span className="text-3xl font-mono text-purple-400 font-bold tracking-tighter">{highScore.toString().padStart(4, '0')}</span>
            </div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Left Side: Game */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Gamepad2 size={20} className="text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-none">Recursive Snake</h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Movement binary active</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LOCAL_NODE: ONLINE
              </div>
            </div>

            <SnakeGame onScoreChange={handleScoreChange} />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Controls</span>
                <p className="text-sm text-zinc-400">Use <span className="text-zinc-200">Arrow Keys</span> to navigate the matrix. Avoid self-collision.</p>
              </div>
              <div className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">Protocol</span>
                <p className="text-sm text-zinc-400">Collect <span className="text-rose-500">Energy Modules</span> to increase length and data score.</p>
              </div>
            </div>
          </section>

          {/* Right Side: Player & Sidebar */}
          <aside className="space-y-8 sticky top-12">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
                  <Music size={20} className="text-purple-500" />
                </div>
                <h2 className="text-lg font-bold text-white">Audio Sync</h2>
              </div>
              <MusicPlayer />
            </section>

            <section className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-500">
                <Trophy size={18} />
                <h3 className="font-bold text-sm uppercase tracking-widest">Global Ranking</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "NEO_V", score: "8,420" },
                  { name: "GHOST_SHELL", score: "7,810" },
                  { name: "TRINITY", score: "6,550" }
                ].map((entry, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-zinc-800/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-600 font-mono">0{i+1}</span>
                      <span className="text-zinc-300 font-medium">{entry.name}</span>
                    </div>
                    <span className="text-zinc-500 font-mono">{entry.score}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
          <p>© 2026 NEON PULSE BROADCAST SYSTEM</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy Cloud</span>
            <span className="hover:text-zinc-400 cursor-pointer transition-colors">Access Terminal</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
