import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, ArrowRight, RotateCcw, Map, Award, DollarSign } from 'lucide-react';
import { LevelDef } from '../types';

interface VictoryModalProps {
  level: LevelDef;
  budgetRemaining: number;
  moneySpent: number;
  stars: number;
  hasNextLevel: boolean;
  onNextLevel: () => void;
  onReplay: () => void;
  onOpenLevels: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  budgetRemaining,
  moneySpent,
  stars,
  hasNextLevel,
  onNextLevel,
  onReplay,
  onOpenLevels,
}) => {
  useEffect(() => {
    // Launch festive confetti bursts
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3">
          <Award className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide">
          ¡NIVEL COMPLETADO!
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {level.title}
        </p>

        {/* Stars Display */}
        <div className="flex items-center justify-center gap-3 my-5">
          {[1, 2, 3].map((starIdx) => {
            const isFilled = starIdx <= stars;
            return (
              <div
                key={starIdx}
                className={`p-2 rounded-xl transition-all transform ${
                  isFilled
                    ? 'scale-110 bg-amber-500/10 border border-amber-500/40 text-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/60 border border-slate-700 text-slate-600'
                }`}
              >
                <Star
                  className={`w-7 h-7 ${
                    isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Score & Budget Card */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 mb-6 space-y-2.5 text-left text-sm">
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400">Presupuesto inicial:</span>
            <span className="font-mono font-bold">${level.budget}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-slate-400">Costo del puente:</span>
            <span className="font-mono font-bold text-amber-400">-${moneySpent}</span>
          </div>
          <div className="h-[1px] bg-slate-700 my-1" />
          <div className="flex justify-between items-center text-base font-bold text-white">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <DollarSign className="w-4 h-4" />
              Dinero Ahorrado:
            </span>
            <span className="font-mono text-emerald-400 text-lg">
              ${budgetRemaining}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Meta 3 estrellas: Ahorrar al menos ${level.threeStarBudget}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onReplay}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Optimizar</span>
          </button>

          {hasNextLevel ? (
            <button
              onClick={onNextLevel}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all cursor-pointer active:scale-95"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenLevels}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
            >
              <Map className="w-4 h-4" />
              <span>Ver Niveles</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
