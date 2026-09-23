import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { LuxuryWatchCanvas } from '../components/3d/LuxuryWatchCanvas';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[85vh] bg-obsidian-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6 glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl">
        <div className="h-48 w-full">
          <LuxuryWatchCanvas
            caseColor="#ef4444"
            bezelColor="#1e2230"
            dialColor="#0a0b0e"
            strapColor="#1e2230"
            isSkeleton={true}
            hasTourbillon={true}
            autoRotate={true}
            enableZoom={false}
            floating={true}
            className="w-full h-full"
          />
        </div>

        <div className="space-y-2">
          <span className="text-gold-400 font-mono text-xs uppercase tracking-widest block">
            404 • Xatolik
          </span>
          <h1 className="font-serif text-3xl font-bold text-platinum-100">
            Sahifa Topilmadi
          </h1>
          <p className="text-xs text-platinum-400 font-sans leading-relaxed">
            Siz qidirayotgan vaqt o‘lchami yoki sahifa mavjud emas yoki boshqa manzilga ko‘chirilgan.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-600 text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:brightness-110 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Bosh Sahifaga Qaytish</span>
        </Link>
      </div>
    </div>
  );
};
