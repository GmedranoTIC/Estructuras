import React from 'react';
import { X, Star, Lock, DollarSign } from 'lucide-react';
import { LevelDef, LevelProgress } from '../types';

interface LevelSelectModalProps {
  levels: LevelDef[];
  progress: Record<number, LevelProgress>;
  currentLevelId: number;
  onSelectLevel: (levelId: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({
  levels,
  progress,
  currentLevelId,
  onSelectLevel,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">Seleccionar Nivel</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Supera los desafíos y ahorra presupuesto para conseguir 3 estrellas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto py-4 pr-1">
          {levels.map((lvl) => {
            const p = progress[lvl.id] || {
              unlocked: lvl.id === 1,
              completed: false,
              bestBudgetRemaining: 0,
              stars: 0,
            };
            const isCurrent = lvl.id === currentLevelId;

            return (
              <button
                key={lvl.id}
                disabled={!p.unlocked}
                onClick={() => {
                  onSelectLevel(lvl.id);
                  onClose();
                }}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-sky-950/60 border-sky-500 ring-2 ring-sky-500/30'
                    : p.unlocked
                    ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Nivel {lvl.id}
                    </span>
                    <h3 className="font-bold text-white text-sm truncate">
                      {lvl.title.replace(`Nivel ${lvl.id}: `, '')}
                    </h3>
                  </div>

                  {!p.unlocked ? (
                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-500 shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= p.stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-slate-400 text-xs mt-1.5 line-clamp-1">
                  {lvl.subtitle}
                </p>

                <div className="flex items-center justify-between text-xs mt-3 pt-2 border-t border-slate-700/40 font-mono text-slate-300">
                  <span className="text-slate-400">Presupuesto: ${lvl.budget}</span>
                  {p.completed && (
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <DollarSign className="w-3 h-3" />
                      Récord: ${p.bestBudgetRemaining}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
