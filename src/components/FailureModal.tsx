import React from 'react';
import { AlertTriangle, RotateCcw, Lightbulb, Map } from 'lucide-react';
import { LevelDef } from '../types';

interface FailureModalProps {
  level: LevelDef;
  reason: string;
  onRetry: () => void;
  onOpenLevels: () => void;
}

export const FailureModal: React.FC<FailureModalProps> = ({
  level,
  reason,
  onRetry,
  onOpenLevels,
}) => {
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-3 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-3">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide">
          ¡EL PUENTE COLAPSÓ!
        </h2>
        <p className="text-rose-400 text-sm font-semibold mt-1">
          {reason || 'La estructura no soportó el peso.'}
        </p>

        {/* Tip Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 my-5 text-left text-sm">
          <div className="flex items-center gap-2 text-amber-400 font-bold mb-1.5 text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            Consejo de Ingeniería
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            {level.tips}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={onOpenLevels}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-amber-950/50 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reforzar Puente</span>
          </button>
        </div>
      </div>
    </div>
  );
};
